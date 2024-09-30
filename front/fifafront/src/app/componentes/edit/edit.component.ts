import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink,BaseChartDirective, CommonModule, FormsModule,JsonPipe],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  id: number = 0;
  nombre: string ="";
  nacionalidad: string="";
  edad: number = 0;
  pace: number =0;
  shooting: number = 0;
  passing: number = 0;
  skill_dribbling: number = 0;
  defending: number = 0;
  physic: number = 0;
  potential: number = 0;
  overall: number = 0;
  player_positions: string = "";
  jugador: any;

  constructor(private apiservice:ApiService, private route: ActivatedRoute){
   
    this.route.params.subscribe(params => {
      this.id = params["id"]
    this.apiservice.get('http://localhost:8000/estadisticas/' + this.id).subscribe({
      error:()=>console.log('Error'),
      next:(response)=>{
        this.jugador=response;
        console.log(this.jugador)
        
      }
     })
    })
  }

  editar(){

    this.apiservice.post('http://localhost:8000/estadisticas/' + this.id,{
      pace:this.pace,
      shooting:this.shooting,
      passing:this.passing,
      skill_dribbling:this.skill_dribbling,
      defending:this.defending,
      physic: this.physic}).subscribe({
       next: (response) => {
         this.pace= 0;
         this.shooting= 0;
         this.passing= 0;
         this.defending= 0;
         this.skill_dribbling = 0;
         this.physic= 0;
         alert("Datos Cabiados con exito");
       }
      });
   } 
 }
