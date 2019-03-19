import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './category/list/list.component';
import { EditComponent } from './category/edit/edit.component';

import { IndustryListComponent } from './industry/industry-list/industry-list.component';
import { IndustryEditComponent } from './industry/industry-edit/industry-edit.component';

import { ContractTypeListComponent } from './type/contract-type-list/contract-type-list.component';
import { ContractTypeEditComponent } from './type/contract-type-edit/contract-type-edit.component';

import { GlobalEditComponent } from './part/global-edit/global-edit.component';
import { GlobalListComponent } from './part/global-list/global-list.component';

import { PartEditComponent } from './part/part-edit/part-edit.component';
import { PartListComponent } from './part/part-list/part-list.component';

const routes: Routes = [

  {path: 'categories', component: ListComponent},
  {path: 'category/create', component: EditComponent},
  {path: 'category/edit/:id', component: EditComponent}, 

  {path: 'industries', component: IndustryListComponent},
  {path: 'industry/create', component: IndustryEditComponent},
  {path: 'industry/edit/:id', component: IndustryEditComponent},
  
  {path: 'global-parts', component: GlobalListComponent},
  {path: 'global-part/create', component: GlobalEditComponent},
  {path: 'global-part/edit/:id', component: GlobalEditComponent},
  
  {path: 'parts', component: PartListComponent},
  {path: 'part/create', component: PartEditComponent},
  {path: 'part/edit/:id', component: PartEditComponent},
  
  {path: 'contract/types', component: ContractTypeListComponent},
  {path: 'contract-type/create', component: ContractTypeEditComponent},
  {path: 'contract-type/edit/:id', component: ContractTypeEditComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
