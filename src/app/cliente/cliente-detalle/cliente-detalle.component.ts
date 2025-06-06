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
      thumbnails: [
      'https://www.bananarepublic.com.pe/media/catalog/product/b/r/br580570_br00_1_1.jpg?optimize=medium&bg-color=255,255,255&height=1305&width=960&canvas=960:1305',
      'https://www.bananarepublic.com.pe/media/catalog/product/b/r/br580570_br00_1_1.jpg?optimize=medium&bg-color=255,255,255&height=1305&width=960&canvas=960:1305',
      'https://www.bananarepublic.com.pe/media/catalog/product/b/r/br580570_br00_1_1.jpg?optimize=medium&bg-color=255,255,255&height=1305&width=960&canvas=960:1305',
      'https://www.bananarepublic.com.pe/media/catalog/product/b/r/br580570_br00_1_1.jpg?optimize=medium&bg-color=255,255,255&height=1305&width=960&canvas=960:1305'
    ],
      title: 'Conjunto de dos piezas',
      description: 'Conjunto elegante de 2 piezas para mujer, traje de pantalón Formal para oficina, uniforme de trabajo de negocios, chaqueta y pantalones.',
    },
    {
      id: 2,
      image: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/133245430_01/w=1500,h=1500,fit=pad',
      title: 'Producto 2',
      description: 'Descripción del Producto 2',
    },
    {
      id: 3,
      image: 'https://ss525.liverpool.com.mx/xl/1146665043.jpg',
      title: 'Producto 3',
      description: 'Descripción del Producto 3',
    },
    {
      id: 4,
      image: 'https://i.pinimg.com/originals/93/a2/2a/93a22a7ea06a7969772fd08ced28ee36.jpg',
      title: 'Producto 4',
      description: 'Descripción del Producto 4',
    },
    {
      id: 5,
      image: 'https://i.pinimg.com/222x/7b/07/5d/7b075dc2ad092a280be4752645ce1542.jpg',
      title: 'Producto 5',
      description: 'Descripción del Producto 5',
    },
    {
      id: 6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch2ZC-8IY-TH5bIn7AOyB0aSW0_1mbudYiQ&s',
      title: 'Producto 6',
      description: 'Descripción del Producto 6',
    },
    {
      id: 7,
      image: 'https://m.media-amazon.com/images/I/813Z6Vvc3FL._AC_UF894,1000_QL80_.jpg',
      title: 'Producto 7',
      description: 'Descripción del Producto 7',
    },
    {
      id: 8,
      image: 'https://img.ltwebstatic.com/images3_spmp/2025/01/03/ee/173591119885371fb2ff85c6dc850588044b7c981f_wk_1735957090_thumbnail_720x.jpg',
      title: 'Producto 8',
      description: 'Descripción del Producto 8',
    },
  ];
  selectedImage: string = '';

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
