import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirCategoriaComponent } from './anadir-categoria.component';

describe('AnadirCategoriaComponent', () => {
  let component: AnadirCategoriaComponent;
  let fixture: ComponentFixture<AnadirCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
