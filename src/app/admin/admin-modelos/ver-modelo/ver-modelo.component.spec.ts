import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerModeloComponent } from './ver-modelo.component';

describe('VerModeloComponent', () => {
  let component: VerModeloComponent;
  let fixture: ComponentFixture<VerModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerModeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
