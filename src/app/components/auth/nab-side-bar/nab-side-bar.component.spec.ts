import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabSideBarComponent } from './nab-side-bar.component';

describe('NabSideBarComponent', () => {
  let component: NabSideBarComponent;
  let fixture: ComponentFixture<NabSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NabSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NabSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
