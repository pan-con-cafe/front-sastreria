import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private apiUrl = 'https://sastreria-estilo-ljge.onrender.com/api/Modelo';

  constructor(private http: HttpClient) {}

  getModeloById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getModelos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
