import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeContactoService {

  private apiUrl = 'https://sastreria-estilo-ljge.onrender.com/api/MensajeContacto';

  constructor(private http: HttpClient) {}

  enviarMensaje(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
