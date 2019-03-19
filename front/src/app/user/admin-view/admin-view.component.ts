import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Admin } from '../admin';
import { AuthService } from '../../auth/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

	id: number;
	user: Admin = {} as Admin;
	loggedInUser: any;
	loadUserData: boolean = false;
	  
	constructor(aroute: ActivatedRoute, private router: Router, private userService: UserService, private auth: AuthService, private _location: Location) {
		aroute.params.subscribe(params => {
			this.id = params['id'];
		});
	}
	ngOnInit() {
		this.loggedInUser = this.auth.getAuth();
		this.loadUser();	 
	}

	loadUser() {
		// Load User
		this.userService.getAdmin(this.id).subscribe(res => {
			this.user = res;
			this.loadUserData = true;
		});
	}
	
	goBack() {
        this._location.back();
    }

}
