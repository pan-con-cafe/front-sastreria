  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Pedido } from '../models/pedido.model';

  @Injectable({
    providedIn: 'root'
  })
  export class PedidoService {
    private apiUrl = 'https://sastreria-estilo-ljge.onrender.com/api/Pedido';

    constructor(private http: HttpClient) {}

    getPedidos(): Observable<Pedido[]> {
      return this.http.get<Pedido[]>(this.apiUrl);
    }

    getPedidosPaged(page: number, pageSize: number): Observable<Pedido[]> {
      return this.http.get<Pedido[]>(
        `${this.apiUrl}/paged?page=${page}&pageSize=${pageSize}`
      );
    }

    getPedidoById(id: number): Observable<Pedido> {
      return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
    }
  }
