import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedido.model';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listado-pedidos.component.html',
  styleUrl: './listado-pedidos.component.css'
})
export class ListadoPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
      },
      error: (err) => console.error('Error al cargar pedidos', err)
    });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/admin/pedidos/ver-pedido', id]);
  }
}