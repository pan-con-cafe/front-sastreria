import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'https://localhost:7057/api/cita'; // Ajusta el puerto si es diferente

  constructor(private http: HttpClient) {}

  createCliente(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  createCita(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
