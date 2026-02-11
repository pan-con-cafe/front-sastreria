import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { PedidoService } from '../services/pedido.service';
import { HorarioService } from '../services/horario.service';
import { ModeloService } from '../services/modelo.service';


interface DiaOcupado {
  dia: string;
  total: number;
  widthEscalada: number;
}


@Component({
  selector: 'app-panel-de-control',
  standalone: true,
  imports: [CommonModule, NgIf ],
  templateUrl: './panel-de-control.component.html',
  styleUrl: './panel-de-control.component.css'
})

/*export const ESTADOS_PEDIDO: Record<number, string> = {
  1: 'Reservado',
  2: 'En proceso',
  3: 'Completado'
};*/

export class PanelDeControlComponent implements OnInit {

  totalPedidos = 0;
  totalModelos = 0;
  pedidosPendientes = 0;

  modelosMasSolicitados: { nombre: string; total: number }[] = [];
  diasMasOcupados: DiaOcupado[] = [];
  horasMasUsadas: { hora: string; total: number }[] = [];
  horariosActivos = 0;
  horariosInactivos = 0;


  pedidosEstado = {
    reservado: 0,
    proceso: 0,
    completado: 0
  };

  horarioMasSolicitado: {
    rango: string;
    total: number;
  } | null = null;

  pieChartStyle = '';
  coloresModelos: string[] = ['#e7d7a5', '#b8c7e0', '#a9c8b9', '#f5a623', '#7ed321'];


  constructor(
    private pedidoService: PedidoService,
    private modeloService: ModeloService,
    private horarioService: HorarioService
  ) {}

  ngOnInit(): void {
    this.cargarResumen();
    this.cargarModelosMasSolicitados();
    this.cargarPedidosPorEstado();
    this.cargarDiasMasOcupados();
    this.cargarHorasMasUsadas();
    this.cargarEstadoHorarios();
    this.cargarHorarioMasSolicitado();
    //this.cargarEstadisticas();
  }

  cargarResumen() {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.totalPedidos = pedidos.length;
      //this.pedidosPendientes = pedidos.filter(p => p.idEstado === 'Pendiente').length;
    });

    this.modeloService.getModelos().subscribe(modelos => {
      this.totalModelos = modelos.length;
    });
  }

  cargarModelosMasSolicitados() {
    this.pedidoService.getPedidos().subscribe(pedidos => {
      this.modeloService.getModelos().subscribe(modelos => {

        const contador: any = {};

        pedidos.forEach(p => {
          contador[p.idModelo] = (contador[p.idModelo] || 0) + 1;
        });

        this.modelosMasSolicitados = Object.keys(contador).map(idModelo => {
          const modelo = modelos.find(m => m.idModelo === +idModelo);
          return {
            nombre: modelo?.nombre || 'Modelo eliminado',
            total: contador[idModelo]
          };
        })
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

        this.actualizarPieChartModelos(); 
      });
    });
  }

  cargarPedidosPorEstado() {
    this.pedidoService.getPedidos().subscribe(pedidos => {

      // Reset por si se recarga
      this.pedidosEstado = {
        reservado: 0,
        proceso: 0,
        completado: 0
      };

      pedidos.forEach(p => {
        if (p.idEstado === 1) this.pedidosEstado.reservado++;
        if (p.idEstado === 2) this.pedidosEstado.proceso++;
        if (p.idEstado === 3) this.pedidosEstado.completado++;
      });

    }); 

  }


  cargarDiasMasOcupados() {
    this.horarioService.getHorarios().subscribe(horarios => {

      const contador: Record<string, number> = {};

      // Contar horarios ocupados (estado === false)
      horarios
        .filter(h => h.estado === false)
        .forEach(h => {
          contador[h.dia] = (contador[h.dia] || 0) + 1;
        });

      const dias = Object.keys(contador).map(dia => ({
        dia,
        total: contador[dia],
        widthEscalada: 0
      }));

      // Escalar barras según el máximo
      const maxTotal = Math.max(...dias.map(d => d.total));

      let diasMasOcupados = dias.map(d => ({
        ...d,
        widthEscalada: maxTotal > 0 ? (d.total / maxTotal) * 100 : 0
      }));

      // Ordenar según el orden de la semana
      const ordenSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

      this.diasMasOcupados = diasMasOcupados.sort((a, b) => 
        ordenSemana.indexOf(a.dia) - ordenSemana.indexOf(b.dia)
      );
    });
  }



  cargarHorasMasUsadas() {
    this.horarioService.getHorarios().subscribe(horarios => {

      const contador: any = {};

      horarios
        .filter(h => h.estado)
        .forEach(h => {
          const rango = `${h.horaInicio.slice(0,5)} - ${h.horaFin.slice(0,5)}`;
          contador[rango] = (contador[rango] || 0) + 1;
        });

      this.horasMasUsadas = Object.keys(contador)
        .map(hora => ({
          hora,
          total: contador[hora]
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);
    });


  }

  actualizarPieChartModelos() {
    if (!this.modelosMasSolicitados || this.modelosMasSolicitados.length === 0) {
      this.pieChartStyle = '';
      return;
    }

    const total = this.modelosMasSolicitados.reduce((sum, m) => sum + m.total, 0);
    if (total === 0) {
      this.pieChartStyle = '';
      return;
    }

    const colors = ['#e7d7a5', '#b8c7e0', '#a9c8b9', '#f5a623', '#7ed321']; // max 5 colores
    let currentPercent = 0;
    let gradientParts: string[] = [];

    this.modelosMasSolicitados.forEach((modelo, index) => {
      const percent = (modelo.total / total) * 100;
      const color = colors[index % colors.length];
      gradientParts.push(`${color} ${currentPercent}% ${currentPercent + percent}%`);
      currentPercent += percent;
    });

    this.pieChartStyle = `conic-gradient(${gradientParts.join(', ')})`;
  }


  cargarEstadoHorarios() {
    this.horarioService.getHorarios().subscribe(horarios => {
      this.horariosActivos = horarios.filter(h => h.estado).length;
      this.horariosInactivos = horarios.filter(h => !h.estado).length;
    });
  }

  cargarHorarioMasSolicitado() {
    this.horarioService.getHorarios().subscribe(horarios => {

      const contador: { [key: string]: number } = {};

      // Solo horarios activos
      horarios
        .filter(h => h.estado)
        .forEach(h => {
          const rango = `${h.horaInicio.slice(0,5)} - ${h.horaFin.slice(0,5)}`;
          contador[rango] = (contador[rango] || 0) + 1;
        });

      if (Object.keys(contador).length === 0) {
        this.horarioMasSolicitado = null;
        return;
      }

      const rangoTop = Object.keys(contador).reduce((a, b) =>
        contador[a] > contador[b] ? a : b
      );

      this.horarioMasSolicitado = {
        rango: rangoTop,
        total: contador[rangoTop]
      };
    });
  }


}
