import { Component, Input, OnInit, inject } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente';


@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

  @Input('id') id! : number;
  private clienteServicio = inject(ClienteService);
  public formBuild = inject(FormBuilder);

  public formCliente:FormGroup = this.formBuild.group({
    nombre: [''],
    telefono:[''],
    pais:[''],
    fechaCreacion:['']
  });

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.id != 0){
      this.clienteServicio.obtener(this.id).subscribe({
        next:(data) =>{
          this.formCliente.patchValue({
            nombre: data.nombre,
            telefono:data.telefono,
            pais:data.pais,
            fechaCreacion:data.fechaCreacion
          })
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

guardar(){
  const objeto : Cliente = {
    id : this.id,
    nombre: this.formCliente.value.nombre,
    telefono: this.formCliente.value.telefono,
    pais:this.formCliente.value.pais,
    fechaCreacion:this.formCliente.value.fechaCreacion,
  }

  if(this.id == 0){
    this.clienteServicio.crear(objeto).subscribe({
      next:(data) =>{
        if(data.isSuccess){
          this.router.navigate(["/"]);
        }else{
          alert("Error al crear")
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }else{
    this.clienteServicio.editar(objeto).subscribe({
      next:(data) =>{
        if(data.isSuccess){
          this.router.navigate(["/"]);
        }else{
          alert("Error al editar")
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }


}

volver(){
  this.router.navigate(["/"]);
}


}
