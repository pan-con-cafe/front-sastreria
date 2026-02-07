import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './admin-bienvenida.component.html',
  styleUrl: './admin-bienvenida.component.css'
})
export class AdminBienvenidaComponent implements OnInit {
  constructor(private titleService: Title){}

  ngOnInit(){
    this.titleService.setTitle('Administrador | Sastrería Estilo');
  }

}
