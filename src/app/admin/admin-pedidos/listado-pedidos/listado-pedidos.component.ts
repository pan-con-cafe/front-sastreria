import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedido.model';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

interface PedidoListado {
  idPedido: number;
  nombreCliente: string;
  descripcionCita: string;
  fechaUltimaCita: string | null;
}

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listado-pedidos.component.html',
  styleUrl: './listado-pedidos.component.css'
})
export class ListadoPedidosComponent implements OnInit {
  //pedidos: Pedido[] = [];

  page: number = 1;
  pageSize: number = 10;
  pedidosAmpliados: PedidoListado[] = [];
  totalPages = 1;

  cachePaginas = new Map<number, PedidoListado[]>();

  private apiPedidos = 'https://sastreria-estilo-ljge.onrender.com/api/Pedido';
  private apiClientes = 'https://sastreria-estilo-ljge.onrender.com/api/Cliente';
  private apiModelos = 'https://sastreria-estilo-ljge.onrender.com/api/Modelo';
  private apiCitas = 'https://sastreria-estilo-ljge.onrender.com/api/Cita';

  constructor(/*private pedidoService: PedidoService,*/ private router: Router, private http: HttpClient) {}

  /*ngOnInit(): void {
    this.cargarPedidos();
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
      },
      error: (err) => console.error('Error al cargar pedidos', err)
    });
  }*/

  ngOnInit() {
    this.cargarPedidos();
  }

  async cargarPedidos() {

    if (this.cachePaginas.has(this.page)) {
      this.pedidosAmpliados = this.cachePaginas.get(this.page)!;
      return;
    }

    const pedidos = await firstValueFrom(this.http.get<any[]>(`${this.apiPedidos}/paged?page=${this.page}&pageSize=${this.pageSize}`));
    const citas = await firstValueFrom(this.http.get<any[]>(this.apiCitas));

      
      this.pedidosAmpliados = await Promise.all(
        pedidos.map(async p => {

          // Obtener cliente
          const cliente = await firstValueFrom(
            this.http.get<any>(`${this.apiClientes}/${p.idCliente}`)
          );

          // Obtener citas del pedido
          let fechaUltimaCita: string | null = null;
          let descripcionCita = 'Sin citas registradas';

          try {
            const citas = await firstValueFrom(
              this.http.get<any[]>(`${this.apiCitas}/por-pedido/${p.idPedido}`)
            );

            if (citas.length > 0) {
              const ultimaCita = citas
                .sort((a, b) =>
                  new Date(b.fechaCita).getTime() - new Date(a.fechaCita).getTime()
                )[0];

              fechaUltimaCita = ultimaCita.fechaCita;
              descripcionCita = ultimaCita.notas || 'Sin notas';
            }
          } catch {
            // si falla, no rompemos la lista
          }

          return {
            idPedido: p.idPedido,
            nombreCliente: `${cliente.nombre} ${cliente.apellido}`,
            descripcionCita,
            fechaUltimaCita
          };
        })
      );

      // 🔹 guardar en cache
      this.cachePaginas.set(this.page, this.pedidosAmpliados);
      this.pedidosAmpliados = this.pedidosAmpliados;
  }

  verDetalle(id: number): void {
    this.router.navigate(['/admin/pedidos/ver-pedido', id]);
  }

  paginaSiguiente(): void {
    this.page++;
    this.cargarPedidos();
  }

  paginaAnterior(): void {
    if (this.page > 1) {
      this.page--;
      this.cargarPedidos();
    }
  }

}