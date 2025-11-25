import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatoSastreriaService {

  private apiUrl = 'https://sastreria-estilo-ljge.onrender.com/api/datosastreria';

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener/2`);
  }
}
