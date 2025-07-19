import { Component, OnInit } from '@angular/core';
import { DatoSastreriaService } from '../services/dato-sastreria.service';
import { DatoSastreria } from '../models/dato-sastreria.model';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  perfil: DatoSastreria = {
    idDatos: 0,
    nombre: '',
    telefono: '',
    direccion: '',
    descripcion: '',
    logoSastreria: ''
  };

  constructor(private datoService: DatoSastreriaService) {}

  ngOnInit(): void {
    this.datoService.getDato().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.perfil = data[0];
        }
      },
      error: (err) => console.error('Error al cargar perfil', err)
    });
  }
}