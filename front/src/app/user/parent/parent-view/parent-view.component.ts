import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { AuthService } from '../../../auth/auth.service';
import { Location} from '@angular/common';

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.css']
})
export class ParentViewComponent implements OnInit {

	id: number;
	user: User = {} as User;
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
		// Load Parent
		this.userService.getUser(this.id).subscribe(res => {
			this.user = res;
			this.loadUserData = true;
		});
	}
	
	goBack() {
        this._location.back();
    }

}
