import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ModeloService } from '../services/modelo.service';

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

  constructor(private route: ActivatedRoute, private modeloService: ModeloService) {}

  ngOnInit(): void {
    // Obtén el parámetro `id` de la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.modeloService.getModeloById(id).subscribe({
      next: (data) => {
        this.product = {
          id: data.idModelo,
          title: data.nombre,
          description: data.descripcion,
          image: data.imagenes?.[0]?.url || 'https://via.placeholder.com/150',
          thumbnails: data.imagenes?.map((img: any) => img.url) || []
        };
      },
      error: (err) => console.error('Error al obtener modelo', err)
    });
  }
}
