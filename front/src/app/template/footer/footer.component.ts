import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  breadcrumb: MenuItem[];
  home: MenuItem;

  constructor(router: Router) {
    router.events
      .subscribe((event: NavigationEnd) => {
        if(event instanceof NavigationEnd) {
          let url = event.urlAfterRedirects.split('?');
          url = url[0].split('/');
          this.breadcrumb = [];
          let routerLink = '';
          url.forEach( (val) => {
            if(val != '') {
              routerLink += val + '/';
              this.breadcrumb.push({
                label: val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
                routerLink: [ routerLink ],
                routerLinkActiveOptions: { exact: true }
              });
            }
          });
        }
      });
  }

  ngOnInit() {
    this.home = { icon: 'fa-home', routerLink: [ '' ], routerLinkActiveOptions: { exact: true } };
  }

}
