import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerLayoutComponent } from './officer-layout.component';

describe('OfficerLayoutComponent', () => {
  let component: OfficerLayoutComponent;
  let fixture: ComponentFixture<OfficerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
