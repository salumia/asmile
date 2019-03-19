import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {path: 'pages/create', component: AddComponent},
  {path: 'pages/edit/:id', component: AddComponent},
  {path: 'pages/list', component: ListComponent},
  {path: 'pages/template/:id', component: TemplateComponent},
  {path: 'pages/preview/:id', component: TemplateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
