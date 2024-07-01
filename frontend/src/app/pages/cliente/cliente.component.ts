import { ChangeDetectionStrategy, Component, Input, OnInit, Pipe, PipeTransform, inject } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormControl,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PhoneMaskDirective } from '../../directives/phone-mask.directive';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-cliente',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule, MatDatepickerModule, CommonModule, PhoneMaskDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})


export class ClienteComponent implements OnInit {

  @Input('id') id! : number;
  public formBuild = inject(FormBuilder);

  public formCliente:FormGroup = this.formBuild.group({
    nombre: ['', Validators.required],
    telefono:['', {updateOn: 'change', validators:[Validators.required], asyncValidators: []}],
    pais:['', Validators.required],
    fechaCreacion:['']
  });

  constructor(private router:Router, private clienteServicio: ClienteService){}

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
    fechaCreacion:this.formCliente.value.fechaCreacion
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
