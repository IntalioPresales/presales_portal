import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDataViewComponent } from './all-data-view.component';

describe('AllDataViewComponent', () => {
  let component: AllDataViewComponent;
  let fixture: ComponentFixture<AllDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
