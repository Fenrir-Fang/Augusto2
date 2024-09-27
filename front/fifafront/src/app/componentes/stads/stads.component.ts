import { Component,OnInit } from '@angular/core';
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
  imports: [RouterLink,BaseChartDirective,CommonModule,FormsModule, JsonPipe],
  templateUrl: './stads.component.html',
  styleUrl: './stads.component.css'
})
export class StadsComponent  implements OnInit{
  id: number = 0;
  nombre: string = "";
  Nversion: number = 1;
  jugador: any;
  constructor(private apiservice:ApiService, private route: ActivatedRoute){
    this.route.params.subscribe(params=>{
this.id=params["id"]
this.apiservice.get('http://localhost:8000/estadisticas/' + this.id).subscribe({
  error:()=>console.log('Error'),
  next:(response)=>{
    this.jugador=response;
  }
 })
    })

  }
  filtrar(){
    // cuando se pone el HTTP con algun filtro va el signo +(mas) this.<la funcion>
    
  }
  public config: any = {
    type: 'radar',
    data: {
  labels: ['jan', 'feb']
    },
    datasets: [{
      label: 'My First Dataset',
      data: ['65', '59', '90', '81', '56', '55', '40'],
      options: {
        aspectRatio:1,
        elements: {
          line: {
            borderWidth: 3
          }
        }
      },
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, 
    {
      label: 'My Second Dataset',
      data: [28, 48, 40, 19, 96, 27, 100],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)' 
    }]
    
  };
  chart: any;
  ngOnInit(): void {
  this.chart = new Chart ('MyChart', this.config);
  }
}
