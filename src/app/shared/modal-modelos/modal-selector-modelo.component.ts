import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-selector-modelo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-selector-modelo.component.html',
  styleUrl: './modal-selector-modelo.component.css'
})
export class ModalSelectorModeloComponent {
  @Input() modelosDisponibles: any[] = [];
  @Output() onClose = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<any[]>();

  modelosSeleccionados: any[] = [];

  seleccionarModelo(modelo: any): void {
  if (!this.modelosSeleccionados.includes(modelo)) {
    this.modelosSeleccionados.push(modelo);
  }
}

  toggleSeleccion(modelo: any) {
    const index = this.modelosSeleccionados.findIndex(m => m.idModelo === modelo.idModelo);
    if (index >= 0) {
      this.modelosSeleccionados.splice(index, 1);
    } else {
      this.modelosSeleccionados.push(modelo);
    }
  }

  isSeleccionado(modelo: any): boolean {
    return this.modelosSeleccionados.some(m => m.idModelo === modelo.idModelo);
  }

  confirmarSeleccion() {
    this.onSelect.emit(this.modelosSeleccionados);
    this.onClose.emit();
  }

  cancelar() {
    this.onClose.emit();
  }
}
