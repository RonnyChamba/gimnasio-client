import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPanelConfigComponent } from './group-panel-config.component';

describe('GroupPanelConfigComponent', () => {
  let component: GroupPanelConfigComponent;
  let fixture: ComponentFixture<GroupPanelConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPanelConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupPanelConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
