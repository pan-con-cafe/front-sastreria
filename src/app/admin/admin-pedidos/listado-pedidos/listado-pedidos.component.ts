import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listado-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listado-pedidos.component.html',
  styleUrl: './listado-pedidos.component.css'
})
export class ListadoPedidosComponent {

}
