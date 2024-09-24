import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpclient:HttpClient) { } 
  get(url:string){
    return this.httpclient.get(url);
  }
}
