import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageParentStudentsComponent } from './manage-parent-students.component';

describe('ManageParentStudentsComponent', () => {
  let component: ManageParentStudentsComponent;
  let fixture: ComponentFixture<ManageParentStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageParentStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageParentStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
