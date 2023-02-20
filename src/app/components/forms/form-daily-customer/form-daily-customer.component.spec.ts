import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDailyCustomerComponent } from './form-daily-customer.component';

describe('FormDailyCustomerComponent', () => {
  let component: FormDailyCustomerComponent;
  let fixture: ComponentFixture<FormDailyCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDailyCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDailyCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
