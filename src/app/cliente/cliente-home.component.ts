import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-cliente-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './cliente-home.component.html',
  styleUrl: './cliente-home.component.css'
})
export class ClienteHomeComponent {

}
