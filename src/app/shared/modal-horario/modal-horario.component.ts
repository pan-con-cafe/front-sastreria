import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Horario {
  idHorario: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  estado: boolean;
  pasado?: boolean;
}

@Component({
  selector: 'app-modal-horario',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './modal-horario.component.html',
  styleUrl: './modal-horario.component.css'
})
export class ModalHorarioComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() horarioSeleccionado = new EventEmitter<Horario>();

  horarios: Horario[] = [];
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  seleccionado: number | null = null;

  private apiUrl = 'https://sastreria-estilo-ljge.onrender.com/api/Horario';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarHorarios();
  }

  cargarHorarios() {
    /*this.http.get<Horario[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.horarios = data.sort((a, b) => {
          const diasOrden = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
          const diaA = diasOrden.indexOf(a.dia);
          const diaB = diasOrden.indexOf(b.dia);

          if (diaA === diaB) {
            return a.horaInicio.localeCompare(b.horaInicio);
          }
          return diaA - diaB;
        });
      },
      error: (err) => {
        console.error('Error al cargar horarios', err);
      }
    });*/

    this.http.get<Horario[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.horarios = data
          .map(h => ({
            ...h,
            fechaReal: this.getFechaDelDia(h.dia)
          }))
          .sort((a, b) => {
            const diasOrden = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const diaA = diasOrden.indexOf(a.dia);
            const diaB = diasOrden.indexOf(b.dia);

            if (diaA === diaB) {
              return a.horaInicio.localeCompare(b.horaInicio);
            }
            return diaA - diaB;
          });
      },
      error: (err) => {
        console.error('Error al cargar horarios', err);
      }
    });
  }

  private getFechaDelDia(diaNombre: string): Date {
    const hoy = new Date();
    const diasOrden = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const indiceActual = hoy.getDay() - 1; 
    const indiceDia = diasOrden.indexOf(diaNombre);

    const fecha = new Date(hoy);
    const diferencia = indiceDia - indiceActual;

    fecha.setDate(hoy.getDate() + diferencia);
    return fecha;
  }

  trackByHorario(index: number, item: Horario) {
    return item.idHorario;
  }

  /** Devuelve los horarios filtrados por día */
  getHorariosPorDia(dia: string): Horario[] {
    //return this.horarios.filter(h => h.dia === dia);
    const hoy = new Date();
    const diaActual = hoy.getDay(); // 1 = lunes, 6 = sábado
    const horaActual = hoy.getHours();
    const minutoActual = hoy.getMinutes();

    const diasOrden = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const indiceDia = diasOrden.indexOf(dia);

    return this.horarios
      .filter(h => h.dia === dia)
      .map(h => {
        const horario = { ...h };

        // 🔹 1. BLOQUEAR DÍAS PASADOS
        if (indiceDia < diaActual - 1) {
          horario.pasado = true;
          return horario;
        }

        // 🔹 2. SI ES HOY → BLOQUEAR HORAS PASADAS
        if (indiceDia === diaActual - 1) {
          const [hh, mm] = horario.horaInicio.split(':').map(Number);

          if (hh < horaActual || (hh === horaActual && mm <= minutoActual)) {
            horario.pasado = true;
          }
        }

        return horario;
      });
  }

  seleccionarHorario(horario: Horario) {
    if (!horario.estado || horario.pasado) return;
    this.seleccionado = horario.idHorario;
  }

  confirmar() {
    const horario = this.horarios.find(h => h.idHorario === this.seleccionado);
    if (horario) {
      this.horarioSeleccionado.emit(horario);
    }
    this.close.emit();
  }

  cancelar() {
    this.seleccionado = null;
    this.close.emit();
  }
}
