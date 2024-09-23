import { LoginComponent } from './componentes/login/login.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { BuscarComponent } from './componentes/buscar/buscar.component';
export const routes: Routes = [{ path: 'buscar', component: BuscarComponent }]//,{ path: 'second-component', component: SecondComponent },];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fifafront';
}
