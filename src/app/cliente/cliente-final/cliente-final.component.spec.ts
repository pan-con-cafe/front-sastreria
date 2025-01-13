import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFinalComponent } from './cliente-final.component';

describe('ClienteFinalComponent', () => {
  let component: ClienteFinalComponent;
  let fixture: ComponentFixture<ClienteFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteFinalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
