import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ClienteComponent } from './pages/cliente/cliente.component';

export const routes: Routes = [
    {path:'',component:InicioComponent},
    {path:'inicio',component:InicioComponent},
    {path:'Cliente/:id',component:ClienteComponent},
];
