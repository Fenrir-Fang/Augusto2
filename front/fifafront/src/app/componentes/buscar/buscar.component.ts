import { Component, input, OnInit } from '@angular/core';
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

export class BuscarComponent{
  nombre: string = "";
  Nversion: string = "";
  nacionalidad: string = "";
  Npagina: number = 1;
  club: string ="";
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
    // cuando se pone el HTTP con algun filtro va el signo +(mas) this.<la funcion>
    this.apiservice.get('http://localhost:8000/jugadores?filtros[long_name]=' + this.nombre +'&filtros[nationality_name]=' + this.nacionalidad + '&filtros[club_name]=' + this.club + '&filtros[fifa_version]=' + this.Nversion).subscribe({
      error:()=>console.log('Error'),
      next:(response)=>{
        this.jugadores=response;
      }
     })
  }

  
  descargar(){
    this.apiservice.download('http://localhost:8000/imprimir?filtros[long_name]=' + this.nombre +'&filtros[nationality_name]=' + this.nacionalidad + '&filtros[club_name]=' + this.club + '&filtros[fifa_version]=' + this.Nversion).subscribe({
      error:(e)=>console.log(e),
      next:(input:any)=>{
        const headers = Object.keys(input.data[0]).toString();
        const main = input.data.map((item: any) => {
          return Object.values(item).toString();
        });
        const csv = [headers, ...main].join('\n');

        const blob = new Blob([csv], {type: 'application/csv'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = 'jugadores.csv';
        a.href = url;
        a.style.display = 'none';
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
      }
    })
  }
  //avanzar las paginas
  paginaSiguiente(){
    this.Npagina = this.Npagina + 1;
    this.apiservice.get('http://localhost:8000/jugadores?page='+this.Npagina + '&filtros[long_name]=' + this.nombre +'&filtros[nationality_name]=' + this.nacionalidad + '&filtros[club_name]=' + this.club + '&filtros[fifa_version]=' + this.Nversion).subscribe({
    error:()=>console.log('Error'),
    next:(response)=>{
      this.jugadores=response;
    }
  })
}
//retroceder las paginas
paginaAnterior(){
  this.Npagina = this.Npagina - 1;
  if (this.Npagina < 1){
this.Npagina = 1;
  }
  this.apiservice.get('http://localhost:8000/jugadores?page='+ this.Npagina + '&filtros[long_name]=' + this.nombre +'&filtros[nationality_name]=' + this.nacionalidad + '&filtros[club_name]=' + this.club + '&filtros[fifa_version]=' + this.Nversion).subscribe({
  error:()=>console.log('Error'),
  next:(response)=>{
    this.jugadores=response;
  }
})
}
}
