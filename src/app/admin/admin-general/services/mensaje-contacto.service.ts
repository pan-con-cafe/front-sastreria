import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeContactoService {

  private apiUrl = 'https://sastreria-estilo-ljge.onrender.com/api/MensajeContacto';

  constructor(private http: HttpClient) {}

  obtenerMensajes() {
    return this.http.get<any[]>(
      'https://sastreria-estilo-ljge.onrender.com/api/MensajeContacto'
    );
  }

  getMensajes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  marcarComoLeido(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/leido`, {});
  }
  
}
