import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { IndustryService } from '../../../contract/industry.service';
import { User } from '../../user';
import { Message, SelectItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location} from '@angular/common';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
	@ViewChild('documentsChild') documentsChild;
	id: number;
	user: User = {} as User;
	msgs: Message[] = [];
	Userform: FormGroup;
	loggedInUser: any;
	loadSpinner: boolean = false;
	editMode: boolean = false;
		
	showPassword: boolean;
	
	constructor(aroute: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder, private auth: AuthService, private messageService: MessageService, private _location: Location, private industryService:IndustryService) {
		this.showPassword = false;
			aroute.params.subscribe(params => {
				this.id = params['id'];
				if(this.id > 0){
					this.editMode = true;
					this.loadSpinner = true;
				}
			});
	}

	ngOnInit() {	
		this.loggedInUser = this.auth.getAuth();
	
		this.Userform = this.fb.group({
			'name': new FormControl('', Validators.required),	
			'username': new FormControl('', Validators.compose([Validators.required]),this.isUsernameUnique.bind(this)),			
			'email': new FormControl('', Validators.compose([Validators.required, Validators.email]),this.isEmailUnique.bind(this)),			
			'phone': new FormControl('', Validators.required),
			'address': new FormControl('', Validators.required),
			'city': new FormControl('', Validators.required),
			'zip': new FormControl('', Validators.required),
			'password': new FormControl('')
		});

		if(this.id > 0 ){
			this.loadUser();
		}else{
			this.Userform.controls['password'].setValidators(Validators.required);
		}
	}
  
	loadUser() {	
		this.userService.getUser(this.id).subscribe(res => {
		  this.user = res;
		  this.loadSpinner = false;
		});
	}
	
	isUsernameUnique(control: FormControl) {
	  const q = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.userService.isUsernameRegisterd(control.value, this.id).subscribe(res => {
                    if(res == 0){
                        resolve(null);
                    } else {
                      this.msgs.push({severity: 'error', summary: 'Username', detail: 'Username not available'});
                        setTimeout(() => {
                          this.msgs = [];
                        }, 2000);
                        resolve({ 'isUsernameUnique': true });
                    }
                });
            }, 1000);
        });
        return q;
    }  
	
	isEmailUnique(control: FormControl) {
        const q = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.userService.isEmailRegisterd(control.value, this.id).subscribe(res => {
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
		this.user.role = 'teacher';
		this.userService.saveUser(this.id, this.user).subscribe(res => {
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: res.message});
			setTimeout(() => {
				if(this.loggedInUser.role == 'admin'){
					this.router.navigate(['teachers']);
				} else {
					this.router.navigate(['dashboard']);
				}			
			}, 2000);
		});
	}
  
	goBack() {
        this._location.back();
    }
	
	toggle_password() {
		this.showPassword = !this.showPassword;
    }
}
