import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Cambia esta URL por la de tu backend
  private apiUrl = 'https://chatbot-1-km1m.onrender.com/chatbot';
  private http = inject(HttpClient);

  enviarMensaje(mensaje: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { message: mensaje });
  }
}
