import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmacion-salida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacion-salida.component.html',
  styleUrl: './confirmacion-salida.component.css'
})
export class ConfirmacionSalidaComponent {
  @Input() mensaje = '¿Estás seguro de que deseas salir sin guardar los cambios?';
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  aceptar() {
    this.confirmar.emit();
  }

  cerrar() {
    this.cancelar.emit();
  }
}
