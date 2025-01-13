import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-modelo',
  standalone: true,
  imports: [NavbarComponent, RouterLink, CommonModule],
  templateUrl: './cliente-modelo.component.html',
  styleUrl: './cliente-modelo.component.css'
})
export class ClienteModeloComponent {
  products = [
    {
      id: 1,
      image: 'https://www.bananarepublic.com.pe/media/catalog/product/b/r/br580570_br00_1_1.jpg?optimize=medium&bg-color=255,255,255&height=1305&width=960&canvas=960:1305',
      title: 'Producto 1',
      description: 'Descripción del Producto 1',
    },
    {
      id: 2,
      image: 'https://www.bananarepublic.cl/media/catalog/product/b/r/br580570_br00_2_1.jpg?optimize=medium&bg-color=255,255,255&height=1305&width=960&canvas=960:1305',
      title: 'Producto 2',
      description: 'Descripción del Producto 2',
    },
    {
      id: 3,
      image: 'https://ss525.liverpool.com.mx/xl/1146665043.jpg',
      title: 'Producto 3',
      description: 'Descripción del Producto 3',
    },
  ];
}
