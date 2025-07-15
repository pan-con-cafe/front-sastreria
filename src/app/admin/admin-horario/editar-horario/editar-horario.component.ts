import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';

@Component({
  selector: 'app-editar-horario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIf, ConfirmacionSalidaComponent],
  templateUrl: './editar-horario.component.html',
  styleUrl: './editar-horario.component.css'
})
export class EditarHorarioComponent {
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  horario: string[][] = [];
  cambiosPendientes = false;
  mostrarModal = false;
  mensajeExito = false;

  ngOnInit(): void {
    const horarioGuardado = localStorage.getItem('horario');
    if (horarioGuardado) {
      this.horario = JSON.parse(horarioGuardado);
    } else {
      // Inicializar con valores por defecto
      this.horario = Array.from({ length: 6 }, () => Array(5).fill('00:00'));
    }
  }

  guardarHorario(): void {
    localStorage.setItem('horario', JSON.stringify(this.horario));

    this.mensajeExito = true;
    this.cambiosPendientes = false; // si usas esta lógica

    setTimeout(() => {
      this.mensajeExito = false;
    }, 10000); // 10 segundos visible
  }

  onCambios() {
    this.cambiosPendientes = true;
  }

  cancelar() {
    if (this.cambiosPendientes) {
      this.mostrarModal = true;
    } else {
      this.router.navigate(['/admin/horario/ver-horario']); // Cambia esta ruta si tu vista destino es diferente
    }
  }

  confirmarSalida() {
    this.mostrarModal = false;
    this.router.navigate(['/admin/horario/ver-horario']);
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  @HostListener('window:beforeunload', ['$event'])
  manejarCierreNavegador(event: BeforeUnloadEvent) {
    if (this.cambiosPendientes) {
      event.preventDefault();
      event.returnValue = true;
    }
  }
  constructor(private router: Router) {}

}