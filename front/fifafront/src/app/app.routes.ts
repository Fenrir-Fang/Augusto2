import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { BuscarComponent } from './componentes/buscar/buscar.component';
import { MainComponent } from './componentes/main/main.component';
import { CrearComponent } from './componentes/crear/crear.component';
import { StadsComponent } from './componentes/stads/stads.component';

export const routes: Routes = [{path: '', redirectTo: 'login', pathMatch: 'full'},{path:'login', component: LoginComponent},
     {path:'main', component: MainComponent}, {path:'buscar', component: BuscarComponent}, 
     {path:'crear', component:CrearComponent},{path:'stats/:id',component: StadsComponent}];
 