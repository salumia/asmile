import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	loggedInUser:any = {};
	notifications: any;
	  
	constructor(private _location: Location,private auth: AuthService,  private router: Router, private userService:UserService) {}

	ngOnInit() {
		this.loggedInUser = this.auth.getAuth();
		//this.loadNotification();
	}
	
	loadNotification(){	
		this.userService.userNotifications(this.loggedInUser.id,this.loggedInUser.role).subscribe(res => {
			this.notifications = res;
		});  
	}
	
	goBack() {
        this._location.back();
    }

}
