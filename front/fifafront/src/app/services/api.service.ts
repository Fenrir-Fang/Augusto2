import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
//instruccion GET
  constructor(private httpclient:HttpClient) { } 
  get(url:string){
    return this.httpclient.get(url);
  }
  //Instruccion POST
  post(url:string, body: any){
    return this.httpclient.post(url, body);
  }
  
}



