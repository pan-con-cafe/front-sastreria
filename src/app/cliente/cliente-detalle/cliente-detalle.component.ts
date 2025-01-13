/*import { Component } from '@angular/core';

@Component({
  selector: 'app-cliente-detalle',
  standalone: true,
  imports: [],
  templateUrl: './cliente-detalle.component.html',
  styleUrl: './cliente-detalle.component.css'
})
export class ClienteDetalleComponent {

}*/


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-detalle',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './cliente-detalle.component.html',
  styleUrl: './cliente-detalle.component.css'
})
export class ClienteDetalleComponent implements OnInit {
  product: any;
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtén el parámetro `id` de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Busca el producto correspondiente por ID
    this.product = this.products.find((p) => p.id === id);

    // Agrega una validación para manejar casos donde no se encuentre el producto
    if (!this.product) {
      console.error('Producto no encontrado para ID:', id);
    }
  }
}
