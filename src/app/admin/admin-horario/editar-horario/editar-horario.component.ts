import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
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
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horario: string[][] = [[], [], [], [], [], [], []];
  dataHorarios: Horario[] = [];
  mensajeExito: boolean = false;
  mostrarModal: boolean = false;
  cambiosPendientes: boolean = false;

  constructor(private horarioService: HorarioService, private router: Router) {}

  ngOnInit(): void {
    this.horarioService.getHorarios().subscribe({
      next: (data) => {
        this.dataHorarios = data;
        this.dias.forEach((dia, index) => {
          const encontrado = data.find(h => h.dia === dia);
          if (encontrado) {
            this.horario[index] = [encontrado.horaInicio, encontrado.horaFin];
          } else {
            this.horario[index] = ['08:00', '18:00']; // Valores por defecto si no hay en BD
          }
        });
      },
      error: (err) => console.error('Error al cargar horario', err)
    });
  }

  onCambios(): void {
    this.cambiosPendientes = true;
  }

  guardarHorario(): void {
    const peticiones = this.dias.map((dia, index) => {
      const horarioExistente = this.dataHorarios.find(h => h.dia === dia);
      const horarioNuevo: Horario = {
        idHorario: horarioExistente?.idHorario ?? 0,
        dia,
        horaInicio: this.horario[index][0],
        horaFin: this.horario[index][1],
        estado: true
      };
      if (horarioExistente) {
        return this.horarioService.updateHorario(horarioExistente.idHorario, horarioNuevo);
      } else {
        return this.horarioService.createHorario(horarioNuevo);
      }
    });

    Promise.all(peticiones.map(p => p.toPromise()))
      .then(() => {
        this.mensajeExito = true;
        this.cambiosPendientes = false;
        setTimeout(() => this.router.navigate(['/admin/horario']), 1500);
      })
      .catch(err => console.error('Error al guardar horario', err));
  }

  cancelar(): void {
    if (this.cambiosPendientes) {
      this.mostrarModal = true;
    } else {
      this.router.navigate(['/admin/horario']);
    }
  }

  confirmarSalida(): void {
    this.router.navigate(['/admin/horario']);
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}