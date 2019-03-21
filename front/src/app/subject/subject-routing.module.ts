import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';

const routes: Routes = [
	  {path: 'subjects', component: SubjectListComponent},
	  {path: 'subject/create', component: SubjectEditComponent},
	  {path: 'subject/edit/:id', component: SubjectEditComponent}
	  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
