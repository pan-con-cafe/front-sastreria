import { Component } from '@angular/core';
import { ChatbotComponent } from '../cliente/chatbot/chatbot.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ChatbotComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
