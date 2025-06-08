import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteServiciosComponent } from './cliente-servicios.component';

describe('ClienteServiciosComponent', () => {
  let component: ClienteServiciosComponent;
  let fixture: ComponentFixture<ClienteServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteServiciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
