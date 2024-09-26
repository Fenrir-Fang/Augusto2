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
  nombre: string ="";
  nacionalidad: string ="";
  edad: number= 0;
  pace: number =0;
  shooting: number = 0;
  passing: number = 0;
  skill_dribbling: number = 0;
  defending: number = 0;
  physic: number = 0;
  potential: number = 0;
  overall: number = 0;
  player_positions: string = "";
  jugadores: any;
  
//cuando es una funcion POST no va nada en el constructor
  constructor(private apiservice:ApiService){

  }
  agregar(){
    /*
    if (this.nombre=="") {
      alert('Debe ingresar un código de articulo distinto a cero');
      return;
    }
  */       
    this.apiservice.post('http://localhost:8000/newPlayer',{long_name:this.nombre,
                         nationality_name:this.nacionalidad,
                         age:this.edad,
                         pace:this.pace,
                         shooting:this.shooting,
                         passing:this.passing,
                         skill_dribbling:this.skill_dribbling,
                         defending:this.defending,
                         potential: this.potential,
                         overall: this.overall,
                         fifa_version:0,
                         fifa_update:0,
                         player_face_url:"",
                         player_positions: "",
                         physic: this.physic}).subscribe({
                          next: (response) => {
                            this.nombre="";
                            this.nacionalidad="";	
                            this.edad=0;
                            this.pace=0;
                            this.shooting=0;
                            this.passing=0;
                            this.skill_dribbling=0;
                            this.defending=0;
                            this.physic=0;
                            this.potential = 0,
                            this.overall = 0,
                            this.player_positions ="";
                            alert("jugador creado");
                          }
                         });
        
  }    
}
