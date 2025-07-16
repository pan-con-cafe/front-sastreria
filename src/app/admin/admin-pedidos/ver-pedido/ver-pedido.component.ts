import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedido.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-pedido.component.html',
  styleUrl: './ver-pedido.component.css'
})
export class VerPedidoComponent implements OnInit {
  pedido!: Pedido;

  constructor(private route: ActivatedRoute, private pedidoService: PedidoService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.pedidoService.getPedidoById(id).subscribe({
      next: (data) => {
        this.pedido = data;
      },
      error: (err) => console.error('Error al cargar pedido', err)
    });
  }
}
