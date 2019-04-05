import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { ManageUserSubjectsComponent } from './manage-user-subjects/manage-user-subjects.component';

const routes: Routes = [
	  {path: 'subjects', component: SubjectListComponent},
	  {path: 'subject/create', component: SubjectEditComponent},
	  {path: 'subject/edit/:id', component: SubjectEditComponent},
	  {path: 'manage-subjects/student/:id', component: ManageUserSubjectsComponent},
	  {path: 'manage-subjects/teacher/:id', component: ManageUserSubjectsComponent}	  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
