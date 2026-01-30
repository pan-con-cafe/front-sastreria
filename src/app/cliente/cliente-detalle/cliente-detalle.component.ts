import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModeloService } from '../services/modelo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-detalle',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './cliente-detalle.component.html',
  styleUrl: './cliente-detalle.component.css'
})
export class ClienteDetalleComponent implements OnInit {
  product: any;
  selectedImage: string = '';

  constructor(private route: ActivatedRoute, private modeloService: ModeloService, private router: Router ) {}

  ngOnInit(): void {
    // Obtén el parámetro `id` de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.modeloService.getModeloById(id).subscribe({
      next: (data) => {
        this.product = {
          id: data.idModelo,
          title: data.nombre,
          description: data.descripcion,
          image: data.imagenes?.[0] || 'assets/no-image.png',
          thumbnails: data.imagenes || []
        };
      },
      error: (err) => console.error('Error al obtener modelo', err)
    });
  }

  goToReserva() {
    if (this.product?.id) {
      this.router.navigate(['/cliente/reserva', this.product.id]);
    } else {
      console.error('No se encontró el ID del modelo');
    }
  }
}
