import { Component} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatoSastreriaService } from '../../shared/services/dato-sastreria.service';

@Component({
  selector: 'app-cliente-final',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './cliente-final.component.html',
  styleUrls: ['./cliente-final.component.css']
})
export class ClienteFinalComponent {
  nombres: string = '';
  fecha: string = '';
  hora: string = '';

  direccion: string = '';
  telefono: string = '';

  constructor(private router: Router, private datoService: DatoSastreriaService) {

    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as any;

    this.nombres = state?.nombres ?? '';
    this.fecha = state?.fecha ?? '';
    this.hora = state?.hora ?? '';

    this.datoService.getDato().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const dato = data[0];
          this.direccion = dato.direccion;
          this.telefono = dato.telefono;
        }
      },
      error: (err) => {
        console.error('Error obteniendo datos de la sastrería', err);
      }
    });
  }
}
