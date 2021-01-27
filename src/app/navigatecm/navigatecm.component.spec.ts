import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatecmComponent } from './navigatecm.component';

describe('NavigatecmComponent', () => {
  let component: NavigatecmComponent;
  let fixture: ComponentFixture<NavigatecmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigatecmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatecmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
