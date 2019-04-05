import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserSubjectsComponent } from './manage-user-subjects.component';

describe('ManageUserSubjectsComponent', () => {
  let component: ManageUserSubjectsComponent;
  let fixture: ComponentFixture<ManageUserSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
