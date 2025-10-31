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

@Component({
  selector: 'app-cliente-reserva',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, ModalHorarioComponent],
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

  submitReservation(): void {
    if (!this.horarioElegido) {
      return;
    }

    // Primero creamos la cita
    const citaRequest = {
      citaFecha: this.horarioElegido.dia + ' ' + this.horarioElegido.horaInicio,
      estado: true,
      notas: '',
      idModelo: this.product.id, // ← Agregar idModelo aquí
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
        this.http.put(`https://localhost:7057/api/Horario/${this.horarioElegido.idHorario}`, {
          ...this.horarioElegido,
          estado: true
        }).subscribe({
          next: () => {
            alert('¡Reserva realizada con éxito!');
            this.router.navigate(['/reservado']);
          },
          error: (err) => {
            console.error('Error al actualizar el estado del horario', err);
            alert('La cita se guardó, pero no se pudo actualizar el horario.');
          }
        });
      },
      error: (err) => {
        console.error('Error al registrar cita', err);
        alert('No se pudo registrar la cita.');
      }
    });
  }

  mostrarModal = false;
  horarioElegido: any = null;

  onHorarioSeleccionado(horario: any) {
    this.horarioElegido = horario;
    this.reservation.fecha = `${horario.dia} ${horario.horaInicio} - ${horario.horaFin}`;
    this.mostrarModal = false; // cerrar modal automáticamente
    console.log('Horario seleccionado:', this.reservation.fecha);
  }

  seleccionarHorario(horario: any) {
    if (!horario.estado) { // Solo permite seleccionar si está disponible
      this.selectedHorario = horario;
    }
  }

  abrirModal() {
    this.mostrarModal = true;
  }

}
