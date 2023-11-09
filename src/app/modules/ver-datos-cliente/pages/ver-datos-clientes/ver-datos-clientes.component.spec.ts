import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDatosClientesComponent } from './ver-datos-clientes.component';

describe('VerDatosClientesComponent', () => {
  let component: VerDatosClientesComponent;
  let fixture: ComponentFixture<VerDatosClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDatosClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDatosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
