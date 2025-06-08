import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit, OnDestroy {
  texto = '';
  mensajesSubscription?: Subscription;
  elemento: HTMLElement | null = null;
  mensajes: any[] = [];
  isChatOpen: boolean = false;

  private chatService = inject(ChatService);
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
  }

  ngOnDestroy() {
    this.mensajesSubscription?.unsubscribe();
  }

  enviar() {
    if (this.texto.trim().length === 0) {
      return;
    }

    const mensajeUsuario = {
      de: 'Usuario',
      cuerpo: this.texto
    };

    this.mensajes.push(mensajeUsuario);

    this.chatService.enviarMensaje(this.texto).subscribe(
      (response) => {
        console.log('recibo: ', response);
        const mensajeFlask = {
          de: 'Chatbot',
          cuerpo: this.sanitizer.bypassSecurityTrustHtml(response['response'])
        };
        this.mensajes.push(mensajeFlask);
      },
      (error) => {
        console.error('Error al enviar el mensaje', error);
      }
    );

    this.texto = '';
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
}
