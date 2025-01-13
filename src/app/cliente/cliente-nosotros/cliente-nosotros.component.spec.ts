import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteNosotrosComponent } from './cliente-nosotros.component';

describe('ClienteNosotrosComponent', () => {
  let component: ClienteNosotrosComponent;
  let fixture: ComponentFixture<ClienteNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteNosotrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
