import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from '../models/pedido.model';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';



interface Cita {
  fechaCita: string;
  notas: string;
}

@Component({
  selector: 'app-ver-pedido',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-pedido.component.html',
  styleUrl: './ver-pedido.component.css'
})


export class VerPedidoComponent implements OnInit {
  pedido!: Pedido;
  nombreCliente: string = '';


  citasAgrupadas: { fecha: string; citas: Cita[] }[] = [];

  private apiCitas = 'https://sastreria-estilo-ljge.onrender.com/api/Cita';
  private apiClientes = 'https://sastreria-estilo-ljge.onrender.com/api/Cliente';


  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private http: HttpClient,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Ver detalle | Sastrería Estilo');
    const id = this.route.snapshot.params['id'];
    this.pedidoService.getPedidoById(id).subscribe({
      next: (data) => {
        this.pedido = data;
        this.cargarCliente(data.idCliente);
        this.cargarCitas(id);
      },
      error: (err) => console.error('Error al cargar pedido', err)
    });
  }

  cargarCliente(idCliente: number): void {
    this.http
      .get<any>(`${this.apiClientes}/${idCliente}`)
      .subscribe(cliente => {
        this.nombreCliente = `${cliente.nombre} ${cliente.apellido}`;
      });
  }

  

  cargarCitas(pedidoId: number): void {
    this.http
      .get<Cita[]>(`${this.apiCitas}/por-pedido/${pedidoId}`)
      .subscribe(citas => {
        this.citasAgrupadas = this.agruparPorFecha(citas);
      });
  }

  private agruparPorFecha(citas: Cita[]) {
    const mapa = new Map<string, Cita[]>();

    citas.forEach(cita => {
      const fecha = cita.fechaCita.split('T')[0]; // solo fecha
      if (!mapa.has(fecha)) {
        mapa.set(fecha, []);
      }
      mapa.get(fecha)!.push(cita);
    });

    return Array.from(mapa.entries()).map(([fecha, citas]) => ({
      fecha,
      citas
    }));
  }
}
