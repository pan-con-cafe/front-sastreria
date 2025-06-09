import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBienvenidaComponent } from './admin-bienvenida.component';

describe('AdminBienvenidaComponent', () => {
  let component: AdminBienvenidaComponent;
  let fixture: ComponentFixture<AdminBienvenidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBienvenidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
