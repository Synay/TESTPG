import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Cliente } from '../models/cliente';
import { ResponseAPI } from '../models/responseAPI';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Cliente";

  constructor() { }

  lista(){
    return this.http.get<Cliente[]>(this.apiUrl);
  }
  obtener(Id:number){
    return this.http.get<Cliente>(`${this.apiUrl}/${Id}`);
  }

  crear(objeto:Cliente){
    return this.http.post<ResponseAPI>(this.apiUrl,objeto);
  }

  editar(objeto:Cliente){
    return this.http.put<ResponseAPI>(this.apiUrl,objeto);
  }

  eliminar(Id:number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${Id}`);
  }
}