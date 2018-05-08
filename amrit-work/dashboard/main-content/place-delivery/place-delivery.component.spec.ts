import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDeliveryComponent } from './place-delivery.component';

describe('PlaceDeliveryComponent', () => {
  let component: PlaceDeliveryComponent;
  let fixture: ComponentFixture<PlaceDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
