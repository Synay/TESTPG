import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ClienteComponent } from './cliente.component';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Agregar Cliente', fakeAsync(() => {
    const testCliente = {
      nombre: 'Victor Mancilla',
      telefono: '+569 6895 1608',
      pais: 'Chile',
      fechaCreacion: '12/02/2024'
    };
    component.formCliente.controls['nombre'].setValue(testCliente.nombre);
    component.formCliente.controls['telefono'].setValue(testCliente.telefono);
    component.formCliente.controls['pais'].setValue(testCliente.pais);
    component.formCliente.controls['fechaCreacion'].setValue(testCliente.fechaCreacion);
    expect(component.guardar).toEqual(testCliente);
  }));
});
