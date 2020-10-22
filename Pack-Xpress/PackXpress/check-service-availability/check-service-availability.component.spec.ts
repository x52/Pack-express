import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckServiceAvailabilityComponent } from './check-service-availability.component';

describe('CheckServiceAvailabilityComponent', () => {
  let component: CheckServiceAvailabilityComponent;
  let fixture: ComponentFixture<CheckServiceAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckServiceAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckServiceAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
