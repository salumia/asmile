import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { Router, NavigationEnd } from '@angular/router';

import { UserRoutingModule } from './user-routing.module';
import { TemplateModule } from "../template/template.module";
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule, InputTextModule, PasswordModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/messages';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SplitButtonModule} from 'primeng/splitbutton';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { InputMaskModule} from 'primeng/inputmask';
import { CalendarModule} from 'primeng/calendar';
import { InputTextareaModule} from 'primeng/inputtextarea';
import { FileUploadModule} from 'primeng/fileupload';
import { GrowlModule } from 'primeng/growl';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProgressSpinnerModule} from 'primeng/progressspinner';
import { TabViewModule} from 'primeng/tabview';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { ConfirmDialogModule} from 'primeng/confirmdialog';

import {ConfirmationService} from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ChartModule} from 'primeng/chart';
import {PaginatorModule} from 'primeng/paginator';


import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ViewComponent } from './view/view.component';

import { TeacherEditComponent } from './teacher/teacher-edit/teacher-edit.component';
import { TeacherListComponent } from './teacher/teacher-list/teacher-list.component';
import { TeacherViewComponent } from './teacher/teacher-view/teacher-view.component';

import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentViewComponent } from './student/student-view/student-view.component';

import { ParentEditComponent } from './parent/parent-edit/parent-edit.component';
import { ParentListComponent } from './parent/parent-list/parent-list.component';
import { ParentViewComponent } from './parent/parent-view/parent-view.component';
import { StudentAddComponent } from './student/student-add/student-add.component';
import { SubjectManageComponent } from './student/subject-manage/subject-manage.component';
import { ViewEngagementComponent } from './student/view-engagement/view-engagement.component';
import { ManageParentStudentsComponent } from './parent/manage-parent-students/manage-parent-students.component';
import { ParentAddComponent } from './parent/parent-add/parent-add.component';

@NgModule({
  imports: [
    Ng4GeoautocompleteModule.forRoot(),
    CommonModule,
    UserRoutingModule,
    FormsModule,
	ReactiveFormsModule,
    TemplateModule,
    MenubarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    PasswordModule,
    MessagesModule,
    InputTextModule,
    DropdownModule,
	SplitButtonModule,
	InputMaskModule,
	CalendarModule,
	InputTextareaModule,
	FileUploadModule,
	GrowlModule,
	ProgressSpinnerModule,
	TabViewModule,
	ConfirmDialogModule,
	AutoCompleteModule,
	ChartModule,
	PaginatorModule
  ],
  providers: [AuthService, UserService, ConfirmationService],
  declarations: [UserListComponent, UserEditComponent, DashboardComponent, ChangePasswordComponent, ViewComponent, AdminViewComponent, AdminEditComponent, TeacherEditComponent, TeacherListComponent, TeacherViewComponent, StudentEditComponent, StudentListComponent, StudentViewComponent, ParentEditComponent, ParentListComponent, ParentViewComponent, StudentAddComponent, SubjectManageComponent, ViewEngagementComponent, ManageParentStudentsComponent, ParentAddComponent]
})
export class UserModule {
  constructor(auth: AuthService, router: Router) {

    // Check login only if we are trying to use this module
    router.events
      .subscribe((event: NavigationEnd) => {
        if(event instanceof NavigationEnd && event.urlAfterRedirects.startsWith('/settings/users')) {

          // Check Permissions (skip checkLogin because it's checked in parent module /settings)
          auth.checkPermissions('user');

        }
      });

  }
}
