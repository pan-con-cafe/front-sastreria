import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModelosComponent } from './admin-modelos.component';

describe('AdminModelosComponent', () => {
  let component: AdminModelosComponent;
  let fixture: ComponentFixture<AdminModelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModelosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
