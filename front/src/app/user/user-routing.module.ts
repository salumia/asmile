import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ViewComponent } from './view/view.component';

import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { TeacherEditComponent } from './teacher/teacher-edit/teacher-edit.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TeacherViewComponent } from './teacher/teacher-view/teacher-view.component';

import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentViewComponent } from './student/student-view/student-view.component';
import { StudentAddComponent } from './student/student-add/student-add.component';
import { SubjectManageComponent } from './student/subject-manage/subject-manage.component';
import { ViewEngagementComponent } from './student/view-engagement/view-engagement.component';

import { ParentEditComponent } from './parent/parent-edit/parent-edit.component';
import { ParentAddComponent } from './parent/parent-add/parent-add.component';
import { ParentListComponent } from './parent/parent-list/parent-list.component';
import { ParentViewComponent } from './parent/parent-view/parent-view.component';

import { ManageParentStudentsComponent } from './parent/manage-parent-students/manage-parent-students.component';

const routes: Routes = [
  {path: 'settings/users', component: UserListComponent},
  {path: 'users', component: UserListComponent},
  {path: 'users/create', component: UserEditComponent},  
  {path: 'users/edit/:id', component: UserEditComponent},
  {path: 'settings/users/create', component: UserEditComponent},
  {path: 'settings/users/edit/:id', component: UserEditComponent},
  {path: 'users/view/:id', component: ViewComponent},
  {path: 'user/change-password', component: ChangePasswordComponent},
     
  {path: 'admin/change-password', component: ChangePasswordComponent},
  {path: 'admin/view/:id', component: AdminViewComponent},
  {path: 'admin/edit/:id', component: AdminEditComponent},
  
  {path: 'dashboard', component: DashboardComponent},
  
  {path: 'teachers', component: TeacherListComponent},
  {path: 'teacher/create', component: TeacherEditComponent},
  {path: 'teacher/edit/:id', component: TeacherEditComponent},
  {path: 'teacher/view/:id', component: TeacherViewComponent},  
  
  {path: 'students', component: StudentListComponent},
  {path: 'student/create', component: StudentEditComponent},
  {path: 'student/edit/:id', component: StudentEditComponent},
  {path: 'student/view/:id', component: StudentViewComponent},   
  {path: 'student/add', component: StudentAddComponent},  
  {path: 'student/manage-subjects/:id', component: SubjectManageComponent},  
  {path: 'student-engagement/view/:id', component: ViewEngagementComponent},  
  
  {path: 'parents', component: ParentListComponent},
  {path: 'parent/create', component: ParentEditComponent},
  {path: 'parent/edit/:id', component: ParentEditComponent},
  {path: 'parent/view/:id', component: ParentViewComponent},  
  {path: 'parent/add', component: ParentAddComponent},
  
  {path: 'parent/manage-students/:id', component: ManageParentStudentsComponent},  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
