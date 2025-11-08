import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { email, password };
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginRequest)
      .pipe(
        map(response => {
          // Stocker l'utilisateur et le token dans le localStorage
          if (response && response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            this.currentUserSubject.next(response.user);
          }
          return response;
        })
      );
  }

  logout(): void {
    // Supprimer l'utilisateur du localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
