import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-cliente-contacto',
  standalone: true,
  imports: [NavbarComponent, ChatbotComponent],
  templateUrl: './cliente-contacto.component.html',
  styleUrl: './cliente-contacto.component.css'
})
export class ClienteContactoComponent {

}
