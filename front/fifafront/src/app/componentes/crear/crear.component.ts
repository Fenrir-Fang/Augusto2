import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {
  nombre: string="";
  nacionalidad: string="";
  edad: number = 1;
  pace: number =1;
  shooting: number = 1;
  passing: number = 1;
  dribbling: number = 1;
  defending: number = 1;
  physic: number = 1;
  jugadores: any;
  
  constructor(private apiservice:ApiService){
    this.apiservice.post('http://localhost:8000/newPlayer').subscribe({
     error:()=>console.log('Error'),
     next:(response)=>{
       this.jugadores=response; 
     }
    })
  
  }
  agregar(){
    this.apiservice.post('http://localhost:8000/newPlayer').subscribe({
      error:()=>console.log('Error'),
      next:(response)=>{
        this.jugadores=response;
      }
    })
  }
}
