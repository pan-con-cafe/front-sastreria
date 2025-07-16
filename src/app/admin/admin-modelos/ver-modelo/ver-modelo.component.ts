import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-modelo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-modelo.component.html',
  styleUrl: './ver-modelo.component.css'
})
export class VerModeloComponent implements OnInit {
  modelos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://localhost:7057/api/Modelo').subscribe({
      next: (data) => {
        this.modelos = data.map(m => ({
          ...m,
          imagen: 'https://localhost:7057/Uploads/' + (m.imagenes[0] || 'placeholder.jpg')
        }));
      }
    });
  }
}
