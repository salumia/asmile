import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { CategoryService } from './category.service';
import { IndustryService } from './industry.service';
import { ContractTypeService } from './contract-type.service';
import { PartService } from './part.service';
import { SetService } from './set.service';
import { ContractService } from './contract.service';
import { Router, NavigationEnd } from '@angular/router';
import { ContractRoutingModule } from './contract-routing.module';
import { TemplateModule } from "../template/template.module";

import { MenubarModule } from 'primeng/menubar';
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule, InputTextModule, PasswordModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/messages';
import { SplitButtonModule} from 'primeng/splitbutton';

import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {FileUploadModule} from 'primeng/fileupload';
import { GrowlModule } from 'primeng/growl';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TabViewModule} from 'primeng/tabview';
import {DragDropModule} from 'primeng/dragdrop';
import {PickListModule} from 'primeng/picklist';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {ConfirmationService} from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FieldsetModule} from 'primeng/fieldset';
import {ListboxModule} from 'primeng/listbox';
import {CardModule} from 'primeng/card';
import {CaptchaModule} from 'primeng/captcha';
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';


import { ListComponent } from './category/list/list.component';
import { EditComponent } from './category/edit/edit.component';
import { IndustryEditComponent } from './industry/industry-edit/industry-edit.component';
import { IndustryListComponent } from './industry/industry-list/industry-list.component';

import { PartListComponent } from './part/part-list/part-list.component';
import { PartEditComponent } from './part/part-edit/part-edit.component';
import { GlobalEditComponent } from './part/global-edit/global-edit.component';
import { GlobalListComponent } from './part/global-list/global-list.component';

import { ContractTypeListComponent } from './type/contract-type-list/contract-type-list.component';
import { ContractTypeEditComponent } from './type/contract-type-edit/contract-type-edit.component';

@NgModule({
  imports: [
    CommonModule,
	ContractRoutingModule,
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
	DragDropModule,
	PickListModule,
	ConfirmDialogModule,
	BrowserAnimationsModule,
	FieldsetModule,
	ListboxModule,
	CardModule,
	CaptchaModule,
	AccordionModule,
	AutoCompleteModule
  ],
  providers: [AuthService, UserService, CategoryService, IndustryService, ContractTypeService, PartService, SetService, ConfirmationService, ContractService],
  declarations: [ListComponent, EditComponent, IndustryListComponent, IndustryEditComponent,  ContractTypeEditComponent, ContractTypeListComponent, GlobalEditComponent, GlobalListComponent, PartListComponent, PartEditComponent]
})
export class ContractModule {
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