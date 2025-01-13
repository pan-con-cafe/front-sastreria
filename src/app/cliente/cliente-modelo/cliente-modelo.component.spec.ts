import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteModeloComponent } from './cliente-modelo.component';

describe('ClienteModeloComponent', () => {
  let component: ClienteModeloComponent;
  let fixture: ComponentFixture<ClienteModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteModeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
