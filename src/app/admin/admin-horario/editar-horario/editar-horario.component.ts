import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { HorarioService } from '../services/horario.service';
import { Horario } from '../models/horario.model';

@Component({
  selector: 'app-editar-horario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIf, ConfirmacionSalidaComponent],
  templateUrl: './editar-horario.component.html',
  styleUrl: './editar-horario.component.css'
})
export class EditarHorarioComponent implements OnInit {
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  horario: Horario[][] = [[], [], [], [], [], [], []];
  dataHorarios: Horario[] = [];
  mensajeExito: boolean = false;
  mostrarModal: boolean = false;
  cambiosPendientes: boolean = false;

  constructor(private horarioService: HorarioService, private router: Router) {}


  ngOnInit(): void {
    this.horarioService.getHorarios().subscribe({
      next: (data) => {

        // ORDENAR primero todo el arreglo
        const diasOrden = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const dataOrdenada = data.sort((a, b) => {
          const dA = diasOrden.indexOf(a.dia);
          const dB = diasOrden.indexOf(b.dia);

          if (dA === dB) {
            return a.horaInicio.localeCompare(b.horaInicio);
          }
          return dA - dB;
        });

        this.dataHorarios = dataOrdenada;
        this.dias.forEach((dia, index) => {
          this.horario[index] = dataOrdenada
            .filter(h => h.dia === dia)
            .map(b => ({
              idHorario: b.idHorario,
              dia,
              horaInicio: b.horaInicio.substring(0, 5),
              horaFin: b.horaFin.substring(0, 5),
              estado: b.estado
            }));
        });
      },
      error: (err) => console.error('Error al cargar horario', err)
    });
  }


  formatearHora(hora: string): string {
    return hora ? hora.substring(0, 5) : '';
  }

  onCambios(): void {
    this.cambiosPendientes = true;
  }

  guardarHorario(): void {
  const horaConSegundos = (hora: string) => hora.length === 5 ? `${hora}:00` : hora;

  const peticiones = this.dias.flatMap((dia, index) =>
    this.horario[index].map(bloque =>
      this.horarioService.updateHorario(bloque.idHorario, {
        ...bloque,
        horaInicio: horaConSegundos(bloque.horaInicio),
        horaFin: horaConSegundos(bloque.horaFin),
        estado: bloque.estado
      })
    )
  );

  Promise.all(peticiones.map(p => p.toPromise()))
    .then(() => {
      this.mensajeExito = true;
      this.cambiosPendientes = false;
      setTimeout(() => this.router.navigate(['/admin/horario/ver-horario']), 1500);
    })
    .catch(err => console.error('Error al guardar horario', err));
}


  cancelar(): void {
    if (this.cambiosPendientes) {
      this.mostrarModal = true;
    } else {
      this.router.navigate(['/admin/horario/ver-horario']);
    }
  }

  confirmarSalida(): void {
    this.router.navigate(['/admin/horario/ver-horario']);
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
