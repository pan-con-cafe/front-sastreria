import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteContactoComponent } from './cliente-contacto.component';

describe('ClienteContactoComponent', () => {
  let component: ClienteContactoComponent;
  let fixture: ComponentFixture<ClienteContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
