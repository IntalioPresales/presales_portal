import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationWonComponent } from './navigation-won.component';

describe('NavigationWonComponent', () => {
  let component: NavigationWonComponent;
  let fixture: ComponentFixture<NavigationWonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationWonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationWonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
