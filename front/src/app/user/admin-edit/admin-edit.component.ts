import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Admin } from '../admin';
import { Message, SelectItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location} from '@angular/common';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
	@ViewChild('documentsChild') documentsChild;
	id: number;
	user: Admin = {} as Admin;
	msgs: Message[] = [];
	Userform: FormGroup;	
	loggedInUser: any;
	loadSpinner: boolean = false;

  constructor(aroute: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder, private auth: AuthService, private messageService: MessageService, private _location: Location) {
    aroute.params.subscribe(params => {
      this.id = params['id'];
      if(this.id > 0){
		  this.loadSpinner = true;
	  }
    });
  }

  ngOnInit() {
	
	this.loggedInUser = this.auth.getAuth();
	
	this.Userform = this.fb.group({
			'name': new FormControl('', Validators.required),
			'email': new FormControl('', Validators.compose([Validators.required, Validators.email]),this.isEmailUnique.bind(this)),			
			'phone': new FormControl('', Validators.required),
			'password': new FormControl('')
		});
		
	  if(this.id > 0 ){
		this.loadUser();
	  }else{
		  this.Userform.controls['password'].setValidators(Validators.required);
	  }
  }
  
  loadUser() {
      this.userService.getAdmin(this.id).subscribe(res => {
      this.user = res;
      this.loadSpinner = false;
    });

  }
  
  isEmailUnique(control: FormControl) {
        const q = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.userService.isEmailRegisterd(control.value, this.id, 'admin').subscribe(res => {
                    console.log('Check Email Calling'+res);
                    if(res == 0){
                        resolve(null);
                    } else {
                      this.msgs.push({severity: 'error', summary: 'Email', detail: 'Email already exist!'});
                        setTimeout(() => {
                          this.msgs = [];
                        }, 2000);
                        resolve({ 'isEmailUnique': true });
                    }
                });
            }, 1000);
        });
        return q;
    }     
	
	
  saveUser() {
	this.loadSpinner = true;
    this.userService.saveAdmin(this.id, this.user).subscribe(res => {
		this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: res.message});
		setTimeout(() => {
			this.router.navigate(['dashboard']);
		}, 2000);
    });
  }

  logoutUser() {
    this.userService.logoutUser(this.id).subscribe(res => {

      // Display message for 2 seconds
      this.msgs.push({severity: 'success', summary: 'Admin Updated', detail: res.message});
      setTimeout(() => {
        this.msgs = [];
      }, 2000);

      // Reload User
      this.loadUser();

    });
  }
  
	goBack() {
        this._location.back();
    }
	
}
