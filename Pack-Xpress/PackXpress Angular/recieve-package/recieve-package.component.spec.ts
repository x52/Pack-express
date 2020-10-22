import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievePackageComponent } from './recieve-package.component';

describe('RecievePackageComponent', () => {
  let component: RecievePackageComponent;
  let fixture: ComponentFixture<RecievePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
