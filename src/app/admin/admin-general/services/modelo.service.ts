import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modelo } from '../models/modelo.model';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private apiUrl = 'https://sastreria-estilo-ljge.onrender.com/api/Modelo';

  constructor(private http: HttpClient) {}

  getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.apiUrl);
  }

  getModeloById(id: number): Observable<Modelo> {
    return this.http.get<Modelo>(`${this.apiUrl}/${id}`);
  }
}
