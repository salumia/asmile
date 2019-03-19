import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'pages-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  public items: MenuItem[];

    constructor() { }

    ngOnInit() {
        this.items = [
            {
                label: 'Pages',
                icon: 'fa-address-card',
                routerLink: [ '/pages/list' ],
                routerLinkActiveOptions: { exact: true }
            },
            {
                label: '|'
            },
            {
                label: 'Create Page',
                icon: 'fa-address-card',
                routerLink: [ '/pages/create' ],
                routerLinkActiveOptions: { exact: true }
            }
        ];
    }

}
