import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirModeloComponent } from './anadir-modelo.component';

describe('AnadirModeloComponent', () => {
  let component: AnadirModeloComponent;
  let fixture: ComponentFixture<AnadirModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirModeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
