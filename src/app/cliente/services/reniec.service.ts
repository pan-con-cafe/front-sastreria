import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReniecService {
  private apiUrl = 'https://sastreria-estilo-ljge.onrender.com/api/cliente/buscar-por-dni/dni'; // La URL de tu backend

  constructor(private http: HttpClient) {}

  buscarPorDni(dni: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${dni}`);
  }
}
