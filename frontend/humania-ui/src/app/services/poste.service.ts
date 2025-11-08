import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Poste } from '../models/poste.model';

@Injectable({
  providedIn: 'root'
})
export class PosteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllPostes(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.apiUrl}/postes`);
  }

  getPosteById(id: number): Observable<Poste> {
    return this.http.get<Poste>(`${this.apiUrl}/postes/${id}`);
  }
}
