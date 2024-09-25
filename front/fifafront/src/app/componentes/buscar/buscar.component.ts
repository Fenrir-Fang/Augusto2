import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit{
  nombre: string = "";
  //version: number = 0;
  nacionalidad: string = "";
  Npagina: number = 1;
  jugadores: any;
  constructor(private apiservice:ApiService){
 this.apiservice.get('http://localhost:8000/jugadores').subscribe({
  error:()=>console.log('Error'),
  next:(response)=>{
    this.jugadores=response;
    
  }
 })
  }
  filtrar(){
    //this.apiservice.post (para agregar al jugador)
    this.apiservice.get('http://localhost:8000/jugadores?filtros[long_name]=' + this.nombre +'&filtros[nationality_name]=' + this.nacionalidad).subscribe({
      error:()=>console.log('Error'),
      next:(response)=>{
        this.jugadores=response;
      }
     })
  }
  descargar(){
    this.apiservice.get('http://localhost:8000/imprimir').subscribe({
      error:()=>console.log('Error'),
      next:(response)=>{
        this.jugadores=response;
      }
    })
  }
  paginaSiguiente(){
    this.Npagina = this.Npagina + 1;
    this.apiservice.get('http://localhost:8000/jugadores?page='+this.Npagina).subscribe({
    error:()=>console.log('Error'),
    next:(response)=>{
      this.jugadores=response;
    }
  })
}
paginaAnterior(){
  this.Npagina = this.Npagina - 1;
  if (this.Npagina < 1){
this.Npagina = 1;
  }
  this.apiservice.get('http://localhost:8000/jugadores?page='+this.Npagina).subscribe({
  error:()=>console.log('Error'),
  next:(response)=>{
    this.jugadores=response;
  }
})
}
public config: any = {
    type: 'radar',
    data: {
labels: ['jan', 'feb']
    },
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 90, 81, 56, 55, 40],
      options: {
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
ngOnInit():void{
  this.chart = new Chart('myChart',this.config);
}

}
