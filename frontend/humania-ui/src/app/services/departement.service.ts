import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Departement } from '../models/departement.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.apiUrl}/departements`);
  }

  getDepartementById(id: number): Observable<Departement> {
    return this.http.get<Departement>(`${this.apiUrl}/departements/${id}`);
  }
}
