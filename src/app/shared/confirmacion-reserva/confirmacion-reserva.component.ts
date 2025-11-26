import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmacion-reserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacion-reserva.component.html',
  styleUrl: './confirmacion-reserva.component.css'
})
export class ConfirmacionReservaComponent {

  @Input() visible = false;

  @Input() titulo: string = "Confirmar reserva";
  @Input() mensaje: string = "Está por realizar una reserva. ¿Desea continuar?";

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirmar() {
    this.onConfirm.emit();
  }

  cancelar() {
    this.onCancel.emit();
  }
}
