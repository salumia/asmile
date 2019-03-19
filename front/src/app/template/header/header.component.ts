import { Component, OnInit } from '@angular/core';
import { MenuItem} from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { TemplateConfigService } from '../template-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  notifications: any;
  loggedInMenus: boolean = false;
  userData: any = '';
  badge: number = 0;
  
  constructor( private auth: AuthService,private templateService: TemplateConfigService, private userService:UserService) {
        this.templateService.listen().subscribe((m:any) => {
            this.refreshHeader();
        })
    }


  ngOnInit() {   
	this.items = [];
	this.userData = this.auth.getAuth();
	
	if(this.userData != null){
		console.log(this.userData);
		this.setSettingMenus();
		
		/* this.loadNotification();
	
		setInterval(()=> {
			this.loadNotification();
		},30000); */
	}
	
  }
  
  setSettingMenus(){
		if(this.items.length == 0){
			if(this.userData.role == "vendor"){
				this.items.push({label: 'Profile', icon: 'fa-user', routerLink: '/vendor/view/'+this.userData.id});
				this.items.push({label: 'Edit Profile', icon: 'fa-pencil', routerLink: '/vendor/edit/'+this.userData.id});
				this.items.push({label: 'Change Password', icon: 'fa-lock', routerLink: '/vendor/change-password'});
			} else if(this.userData.role == "admin"){
				this.items.push({label: 'Profile', icon: 'fa-user', routerLink: '/admin/view/'+this.userData.id});
				this.items.push({label: 'Edit Profile', icon: 'fa-pencil', routerLink: '/admin/edit/'+this.userData.id});
				this.items.push({label: 'Change Password', icon: 'fa-lock', routerLink: '/admin/change-password'});
			} else {
				this.items.push({label: 'Profile', icon: 'fa-user', routerLink: '/users/view/'+this.userData.id});
				this.items.push({label: 'Edit Profile', icon: 'fa-pencil', routerLink: '/users/edit/'+this.userData.id});
				this.items.push({label: 'Change Password', icon: 'fa-lock', routerLink: '/user/change-password'});
			}
			
			this.items.push({label: 'Logout', icon: 'fa-sign-out', routerLink: '/logout'});
		}
		this.loggedInMenus = true;
	}
  
  loadNotification(){	
	console.log('calling');
	/* if(this.userData != null){
		this.userService.userNotifications(this.userData.id,this.userData.role).subscribe(res => {
			this.notifications = res;
			this.badge = 0;
			for (let notify of this.notifications) {
			   console.log(notify);
			   if(notify.is_viewed == 0){
				   this.badge = this.badge + 1;
			   }
			}
			
			console.log('notifications');
			console.log(this.notifications);
		});  
	}	 */
  }
  
  refreshHeader() {
	console.log('header refresh');	
	this.userData = this.auth.getAuth();	 
	this.setSettingMenus();
	if(this.userData != null){
		//this.loadNotification();
	} else {
		this.loggedInMenus = false;
	}
	
  }

}