import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private clienteServicio = inject(ClienteService);
  public listaClientes:Cliente[] = [];
  public displayedColumns : string[] = ['Nombre','Telefono','Pais','fechaCreacion','Accion'];

  obtenerClientes(){
    console.log(this.listaClientes);
    this.clienteServicio.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaClientes = data;
          
        }
        console.log(this.listaClientes);
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){

    this.obtenerClientes();
  }

  nuevo(){
    this.router.navigate(['/Cliente',0]);
  }

  editar(objeto:Cliente){
    this.router.navigate(['/Cliente',objeto.id]);
  }
  eliminar(objeto:Cliente){
    if(confirm("Desea eliminar el cliente" + objeto.nombre)){
      console.log(objeto.nombre)
      this.clienteServicio.eliminar(objeto.id).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.obtenerClientes();
          }else{
            alert("no se pudo eliminar")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }

}