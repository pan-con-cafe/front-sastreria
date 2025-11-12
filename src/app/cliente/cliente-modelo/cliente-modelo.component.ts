import { Component, ViewChild, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { HttpClient } from '@angular/common/http';
import { CategoriaConModelos } from '../../interfaces/categoria-con-modelos';

@Component({
  selector: 'app-cliente-modelo',
  standalone: true,
  imports: [NavbarComponent, RouterLink, CommonModule, ChatbotComponent],
  templateUrl: './cliente-modelo.component.html',
  styleUrl: './cliente-modelo.component.css'
})
export class ClienteModeloComponent implements OnInit {
  categoriasConModelos: CategoriaConModelos[] = [];
  verTodo: any[] = [];

  @ViewChildren('carousel') carousels!: QueryList<ElementRef>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<CategoriaConModelos[]>('https://sastreria-estilo-ljge.onrender.com/api/Categoria/con-modelos').subscribe({
      next: (data) => {
        this.verTodo = data.find(c => c.categoria === 'Ver todo')?.modelos || [];
        this.categoriasConModelos = data.filter(c => c.categoria !== 'Ver todo');

      },

      error: (err) => {
        console.error('Error al cargar categorías y modelos:', err);
      }
    });
  }

  scrollLeft(index: number): void {
    const carousel = this.carousels.get(index);
    carousel?.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(index: number): void {
    const carousel = this.carousels.get(index);
    carousel?.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
