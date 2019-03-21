import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TemplateModule } from './template/template.module';
import { ConfigServiceService } from './config-service.service';
import { FormsModule } from '@angular/forms';
import { PagesModule } from './pages/pages.module';
import { ContractModule } from './contract/contract.module';
import { SubjectModule } from './subject/subject.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StorageServiceModule,
    AuthModule,
    UserModule,
    TemplateModule,
    FormsModule,
	PagesModule,
	ContractModule,
	SubjectModule
  ],
  providers: [ConfigServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
