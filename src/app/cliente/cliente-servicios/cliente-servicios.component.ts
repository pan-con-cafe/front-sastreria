import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-servicios',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './cliente-servicios.component.html',
  styleUrl: './cliente-servicios.component.css'
})
export class ClienteServiciosComponent {
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
