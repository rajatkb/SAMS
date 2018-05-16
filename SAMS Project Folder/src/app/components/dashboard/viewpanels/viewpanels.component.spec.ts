import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpanelsComponent } from './viewpanels.component';

describe('ViewpanelsComponent', () => {
  let component: ViewpanelsComponent;
  let fixture: ComponentFixture<ViewpanelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpanelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
