import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPagarPage } from './modal-pagar.page';

describe('ModalPagarPage', () => {
  let component: ModalPagarPage;
  let fixture: ComponentFixture<ModalPagarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalPagarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
