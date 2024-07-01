import { TestBed } from '@angular/core/testing';

import { ClienteService } from './cliente.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule], 
    providers: [ClienteService]
  }));

   it('should be created', () => {
    const service: ClienteService = TestBed.get(ClienteService);
    expect(service).toBeTruthy();
   });

   it('Crear', () => {
    const service: ClienteService = TestBed.get(ClienteService);
    expect(service.crear).toBeTruthy();
   });
   it('listar', () => {
    const service: ClienteService = TestBed.get(ClienteService);
    expect(service.lista).toBeTruthy();
   });
   it('Editar', () => {
    const service: ClienteService = TestBed.get(ClienteService);
    expect(service.editar).toBeTruthy();
   });
   it('Eliminar', () => {
    const service: ClienteService = TestBed.get(ClienteService);
    expect(service.eliminar).toBeTruthy();
   });
   it('Obteneer', () => {
    const service: ClienteService = TestBed.get(ClienteService);
    expect(service.obtener).toBeTruthy();
   });

});
