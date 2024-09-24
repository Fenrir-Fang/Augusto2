import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {
  nombre: string = "";
  //version: number = 0;
  nacionalidad: string = "";
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
    this.apiservice.get('http://localhost:8000/jugadores?filtros[long_name]=&filtros[nationality_name]=' + this.nombre + this.nacionalidad).subscribe({
      error:()=>console.log('Error'),
      next:(response)=>{
        this.jugadores=response;
      }
     })
  }
}

