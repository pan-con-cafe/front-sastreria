import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionSalidaComponent } from './confirmacion-salida.component';

describe('ConfirmacionSalidaComponent', () => {
  let component: ConfirmacionSalidaComponent;
  let fixture: ComponentFixture<ConfirmacionSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmacionSalidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
