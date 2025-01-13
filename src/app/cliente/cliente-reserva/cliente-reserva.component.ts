import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cliente-reserva',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './cliente-reserva.component.html',
  styleUrl: './cliente-reserva.component.css'
})
export class ClienteReservaComponent implements OnInit{
  product: any | undefined;
  reservation = {
    dni: '',
    fecha: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    opcion: '',
  };

  products = [
    {
      id: 1,
      image: 'https://www.bananarepublic.com.pe/media/catalog/product/b/r/br580570_br00_1_1.jpg?optimize=medium&bg-color=255,255,255&height=1305&width=960&canvas=960:1305',
      title: 'Producto 1',
      description: 'Conjunto elegante de 3 piezas para mujer, traje de pantalón formal...',
    },
    {
      id: 2,
      image: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/133245430_01/w=1500,h=1500,fit=pad',
      title: 'Producto 2',
      description: 'Traje de oficina clásico, ideal para eventos formales...',
    },
    {
      id: 3,
      image: 'https://ss525.liverpool.com.mx/xl/1146665043.jpg',
      title: 'Producto 3',
      description: 'Uniforme de negocios con un diseño moderno...',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtén el ID del producto de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Busca el producto correspondiente
    this.product = this.products.find((p) => p.id === id);
  }

  submitReservation(): void {
    // Aquí puedes implementar la lógica para enviar la reserva a tu backend
    console.log('Reserva enviada:', this.reservation);
  }
}
