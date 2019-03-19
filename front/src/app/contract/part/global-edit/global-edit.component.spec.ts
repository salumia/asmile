import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalEditComponent } from './global-edit.component';

describe('GlobalEditComponent', () => {
  let component: GlobalEditComponent;
  let fixture: ComponentFixture<GlobalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
