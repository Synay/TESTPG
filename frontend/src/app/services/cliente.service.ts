import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Cliente } from '../models/cliente';
import { ResponseAPI } from '../models/responseAPI';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl:string = appsettings.apiUrl + "Cliente";

  constructor(private http: HttpClient) { }

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