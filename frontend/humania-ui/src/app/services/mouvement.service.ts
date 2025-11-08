import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mouvement } from '../models/mouvement.model';

@Injectable({
  providedIn: 'root'
})
export class MouvementService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllMouvements(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(`${this.apiUrl}/mouvements`);
  }

  getMouvementsByEmploye(employeId: number): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(`${this.apiUrl}/mouvements/employe/${employeId}`);
  }
}
