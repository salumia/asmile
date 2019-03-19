import { Component } from '@angular/core';
import { TemplateConfigService } from "./template/template-config.service";
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
  	loggedInUser: any;
	constructor(public template: TemplateConfigService, private auth: AuthService) {
		this.template.listen().subscribe((m:any) => {
            this.refreshStyle();
        })
	}
  	ngOnInit() {
		this.loggedInUser = this.auth.getAuth();
		console.log(this.loggedInUser);
	}
	
	refreshStyle() {
		this.loggedInUser = this.auth.getAuth();
	}
}
