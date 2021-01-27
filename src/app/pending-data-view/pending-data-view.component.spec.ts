import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDataViewComponent } from './pending-data-view.component';

describe('PendingDataViewComponent', () => {
  let component: PendingDataViewComponent;
  let fixture: ComponentFixture<PendingDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
