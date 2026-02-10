import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ModeloService } from '../services/modelo.service';
import { CitaService } from '../services/cita.service';
import { ReniecService } from '../services/reniec.service';
import { ModalHorarioComponent } from '../../shared/modal-horario/modal-horario.component';
import { HttpClient } from '@angular/common/http';
import { ConfirmacionReservaComponent } from '../../shared/confirmacion-reserva/confirmacion-reserva.component';
import { LoaderService } from '../../shared/loader/loader.service';

@Component({
  selector: 'app-cliente-reserva',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ModalHorarioComponent, ConfirmacionReservaComponent],
  templateUrl: './cliente-reserva.component.html',
  styleUrl: './cliente-reserva.component.css'
})
export class ClienteReservaComponent implements OnInit {

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

  idCliente: number | null = null;
  nombresDisabled: boolean = false;
  apellidosDisabled: boolean = false;
  selectedHorario: any = null; // Variable para guardar el horario


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modeloService: ModeloService,
    private citaService: CitaService,
    private reniecService: ReniecService,
    private http: HttpClient,
    public loader: LoaderService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.modeloService.getModeloById(id).subscribe({
      next: (data) => {
        this.product = {
          id: data.idModelo,
          title: data.nombre,
          description: data.descripcion,
          image: data.imagenes?.[0] || 'https://via.placeholder.com/150',
        };
      },
      error: (err) => console.error('Error al obtener modelo', err)
    });
  }

  onDniBlur(): void {
    if (this.reservation.dni.length === 8) {
      this.reniecService.buscarPorDni(this.reservation.dni).subscribe({
        next: (data) => {
          this.reservation.nombres = data.nombres;
          this.reservation.apellidos = data.apellidos;
          this.nombresDisabled = true;
          this.apellidosDisabled = true;
        },
        error: () => {
          console.error('No se pudo obtener datos de RENIEC');
          this.reservation.nombres = '';
          this.reservation.apellidos = '';
          this.nombresDisabled = false;
          this.apellidosDisabled = false;
        }
      });
    }
  }

  mostrarModal = false;
  horarioElegido: any = null;

  onHorarioSeleccionado(horario: any) {
    this.horarioElegido = horario;
    this.reservation.fecha = `${horario.dia} ${horario.horaInicio} - ${horario.horaFin}`;
    this.mostrarModal = false; // cerrar modal automáticamente

  }

  seleccionarHorario(horario: any) {
    if (horario.estado) { // Solo permite seleccionar si está disponible
      this.selectedHorario = horario;
    }
  }

  getFechaDesdeDia(dia: string): string {
    if (!dia) return '';

    const dias = [
      'domingo',
      'lunes',
      'martes',
      'miercoles',
      'jueves',
      'viernes',
      'sabado'
    ];

    const hoy = new Date();
    const hoyIdx = hoy.getDay();

    const idx = dias.indexOf(dia.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));

    if (idx === -1) return '';

    let diff = idx - hoyIdx;
    if (diff <= 0) diff += 7;

    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + diff);

    return fecha.toLocaleDateString('es-PE');
  }

  formatearHora(hora: string): string {
    if (!hora) return '';
    return hora.substring(0, 5); // HH:mm
  }

  getFechaCita(): string {
    if (!this.horarioElegido) return '';
    return this.getFechaDesdeDia(this.horarioElegido.dia);
  }


  abrirModal() {
   this.mostrarModal = true;
  }

  modalReservaVisible = false;

  abrirModalReserva() {
    this.modalReservaVisible = true;
  }

  confirmarReserva() {
    this.modalReservaVisible = false;
    this.submitReservation(); // ← Llama aquí tu método real
  }

  cancelarReserva() {
    this.modalReservaVisible = false;
  }

  submitReservation(): void {
    if (!this.horarioElegido) {
      return;
    }

    this.loader.show();
    
    // Primero creamos la cita
    const citaRequest = {
      IdHorario: this.horarioElegido.idHorario,
      estado: true,
      notas: '',
      idModelo: this.product.id,
      cliente: {
        idTipoDocumento: 1,
        numeroDocumento: this.reservation.dni,
        nombre: this.reservation.nombres,
        apellido: this.reservation.apellidos,
        correo: this.reservation.correo,
        telefono: this.reservation.telefono
      }
    };

    this.citaService.createCita(citaRequest).subscribe({
      next: () => {
        // Luego, actualizamos el estado del horario a ocupado (true)
        this.http.put(`https://sastreria-estilo-ljge.onrender.com/api/Horario/${this.horarioElegido.idHorario}`,{
          ...this.horarioElegido,
          estado: false
        }).subscribe({
          next: () => {
            this.loader.hide();
            this.router.navigate(['/cliente/reservado'], {
              state: {
                nombres: this.reservation.nombres + ' ' + this.reservation.apellidos,
                fecha: this.getFechaCita(),
                hora: this.formatearHora(this.horarioElegido?.horaInicio),
                direccion: '', 
                telefono: ''
              }
            });

          },
          error: (err) => {
            this.loader.hide();
            console.error('Error al actualizar el estado del horario', err);
          }
        });
      },
      error: (err) => {
        this.loader.hide();
        console.error('Error al registrar cita', err);
        alert('No se pudo registrar la cita.');
      }
    });
  }

}
