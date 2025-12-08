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
  detalle: string;
  fechaCita: string | null;
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
  pedidosAmpliados: PedidoListado[] = [];

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
    const pedidos = await firstValueFrom(this.http.get<any[]>(this.apiPedidos));
    const citas = await firstValueFrom(this.http.get<any[]>(this.apiCitas));

      
      this.pedidosAmpliados = await Promise.all(
        pedidos.map(async p => {

          // 1. Obtener cliente
          const cliente = await firstValueFrom(
            this.http.get<any>(`${this.apiClientes}/${p.idCliente}`)
          );

          // 2. Obtener modelo (solo si quieres mostrarlo)
          let modeloDescripcion = '';
          if (p.idModelo) {
            const modelo = await firstValueFrom(
              this.http.get<any>(`${this.apiModelos}/${p.idModelo}`)
            );
            modeloDescripcion = modelo?.descripcion ?? '';
          }

          // 3. Obtener fecha de CITA
          const cita = citas.find(c => c.pedidoId === p.idPedido);
          const fechaCita = cita?.fechaCita ?? null;

          return {
            idPedido: p.idPedido,
            nombreCliente: `${cliente.nombre} ${cliente.apellido}`,
            detalle: modeloDescripcion || p.detalle || "Sin descripción",
            fechaCita
          };
        })
      );
  }

  verDetalle(id: number): void {
    this.router.navigate(['/admin/pedidos/ver-pedido', id]);
  }
}