import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Document } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/documents`);
  }

  getDocumentsARenouveler(): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/documents/a-renouveler`);
  }

  getDocumentsByEmploye(employeId: number): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/documents/employe/${employeId}`);
  }
}
