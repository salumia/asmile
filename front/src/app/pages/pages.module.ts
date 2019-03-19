import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AddComponent } from './add/add.component';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule, InputTextModule, PasswordModule, EditorModule } from 'primeng/primeng';
import {FileUploadModule} from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';

import { GrowlModule } from 'primeng/growl';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/components/common/messageservice';

import { PagesService } from './pages.service';
import { ListComponent } from './list/list.component';
import { MenubarComponent } from './menubar/menubar.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  imports: [
    CommonModule,
	FormsModule,
	PanelModule,
    ReactiveFormsModule,
    PagesRoutingModule,
	DropdownModule, InputTextModule, PasswordModule, EditorModule, FileUploadModule,
	TableModule,
	MenubarModule,
	ConfirmDialogModule,
	GrowlModule,
    MessagesModule,
  ],
  providers: [AuthService, PagesService, MessageService],
  declarations: [AddComponent, ListComponent, MenubarComponent, TemplateComponent]
})
export class PagesModule {
	constructor(auth: AuthService, router: Router) {

    // Check login only if we are trying to use this module
    router.events
      .subscribe((event: NavigationEnd) => {
        if(event instanceof NavigationEnd && event.urlAfterRedirects.startsWith('/agencies/list')) {

          // Check Login
          auth.checkLogin();

          // Check Permissions
          //auth.checkPermissions('client');

        }
      });

  }
}

