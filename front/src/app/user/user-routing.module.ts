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
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
