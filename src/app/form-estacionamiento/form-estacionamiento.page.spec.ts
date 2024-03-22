import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormEstacionamientoPage } from './form-estacionamiento.page';

describe('FormEstacionamientoPage', () => {
  let component: FormEstacionamientoPage;
  let fixture: ComponentFixture<FormEstacionamientoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormEstacionamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
