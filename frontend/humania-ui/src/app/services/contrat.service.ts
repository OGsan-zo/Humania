import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contrat } from '../models/contrat.model';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiUrl}/contrats`);
  }

  getContratById(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.apiUrl}/contrats/${id}`);
  }

  getContratsARenouveler(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiUrl}/contrats/a-renouveler`);
  }
}
