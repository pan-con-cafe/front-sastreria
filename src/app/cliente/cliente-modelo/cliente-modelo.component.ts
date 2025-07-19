import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cliente-modelo',
  standalone: true,
  imports: [NavbarComponent, RouterLink, CommonModule, ChatbotComponent],
  templateUrl: './cliente-modelo.component.html',
  styleUrl: './cliente-modelo.component.css'
})
export class ClienteModeloComponent implements OnInit {
  categoriasConModelos: any[] = [];
  todosLosModelos: any[] = [];

  @ViewChild('populares') populares!: ElementRef;
  @ViewChild('paraElla') paraElla!: ElementRef;

  private refs: Record<string, ElementRef> = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://localhost:7057/api/Modelo/categorias').subscribe({
      next: (data) => this.categoriasConModelos = data,
      error: (err) => console.error(err)
    });

    this.http.get<any[]>('https://localhost:7057/api/Modelo').subscribe({
      next: (data) => this.todosLosModelos = data,
      error: (err) => console.error(err)
    });
  }

  ngAfterViewInit(): void {
    this.refs = {
      populares: this.populares,
      paraElla: this.paraElla,
    };
  }

  scrollLeft(refName: string): void {
    const element = this.refs[refName]?.nativeElement;
    if (element) {
      element.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(refName: string): void {
    const element = this.refs[refName]?.nativeElement;
    if (element) {
      element.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }
}
