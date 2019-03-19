import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateConfigService } from "./template-config.service";

import { MenuModule } from 'primeng/menu';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    BreadcrumbModule
  ],
  providers: [TemplateConfigService],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent]
})
export class TemplateModule { }
