import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatoSastreria } from '../models/dato-sastreria.model';

@Injectable({
  providedIn: 'root'
})
export class DatoSastreriaService {
  private apiUrl = 'https://localhost:7057/api/DatoSastreria';

  constructor(private http: HttpClient) {}

  getDato(): Observable<DatoSastreria[]> {
    return this.http.get<DatoSastreria[]>(this.apiUrl);
  }

  updateDato(id: number, dato: DatoSastreria): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dato);
  }
}
