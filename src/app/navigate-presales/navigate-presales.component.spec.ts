import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatePresalesComponent } from './navigate-presales.component';

describe('NavigatePresalesComponent', () => {
  let component: NavigatePresalesComponent;
  let fixture: ComponentFixture<NavigatePresalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigatePresalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatePresalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
