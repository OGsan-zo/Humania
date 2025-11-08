import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employe } from '../models/employe.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.apiUrl}/employes`);
  }

  getEmployeById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.apiUrl}/employes/${id}`);
  }
}
