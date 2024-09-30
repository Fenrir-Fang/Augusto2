import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
Chart.register(...registerables);
@Component({
  selector: 'app-stads',
  standalone: true,
  imports: [RouterLink, BaseChartDirective, CommonModule, FormsModule, JsonPipe],
  templateUrl: './stads.component.html',
  styleUrl: './stads.component.css'
})
export class StadsComponent implements OnInit {
  id: number = 0;
  nombre: string = "";
  Nversion: number = 1;
  jugador: any;
  config: any = null;
  chart:any;
  constructor(private apiservice: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params["id"]
      this.apiservice.get('http://localhost:8000/estadisticas/' + this.id).subscribe(
      {
        error: () => console.log('Error'),
        next: (response) => {
          this.jugador = response;
          console.log(this.jugador);
          this.config = {
            type: 'radar',
            data: {
              labels: ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physic'],
              datasets: [{
                label: 'Stats del Jugador',
                data: [this.jugador.pace, this.jugador.shooting, this.jugador.passing, this.jugador.dribbling, this.jugador.defending, this.jugador.physic],
              }]
            }
          }
          this.chart = new Chart('MyChart', this.config);
      }
    })
  })
}
  filtrar() {
    // cuando se pone el HTTP con algun filtro va el signo +(mas) this.<la funcion>

  }


  ngOnInit(): void {

  }
}
