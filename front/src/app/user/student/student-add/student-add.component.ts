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
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})

export class StudentAddComponent implements OnInit {
	@ViewChild('documentsChild') documentsChild;
	id: number;
	user: User = {} as User;
	msgs: Message[] = [];
	Userform: FormGroup;
	loggedInUser: any;
	loadSpinner: boolean = false;
	editMode: boolean = false;
		
	showPassword: boolean;
	
	Searchform: FormGroup;
	suggestions: any[];
	
	addUserTab = true;
	searchTab = true;
	
	student_id:number;	
	selectedContact:string = "";	
    
	
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
		
		this.Searchform = this.fb.group({
			'email': new FormControl('', Validators.compose([Validators.required, Validators.email]))
		});

		if(this.id > 0 ){
			this.loadUser();
		}else{
			this.Userform.controls['password'].setValidators(Validators.required);		
		}
	}
	
	saveSearchStudent() {
		this.createLink(this.student_id);
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
					  this.msgs.push({severity: 'error', summary: 'Username', detail: 'Username already registered with system. Use Search Student Tab to add in your list'});
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
                      this.msgs.push({severity: 'error', summary: 'Email', detail: 'Email already registered with system. Use Search Student Tab to add in your list'});
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
	
	createLink(student_id) {
		this.userService.createLink(this.loggedInUser.id, student_id).subscribe(res => {				
				if(res.data.id > 0 ){
					this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: "Student added and linked with you"});
				}					
				
				setTimeout(() => {
					this.router.navigate(['students']);
				}, 2000);
		});
	}
	
	saveUser() {
		this.loadSpinner = true;
		this.user.role = 'student';
		this.userService.saveUser(this.id, this.user).subscribe(res => {
				this.createLink(res.user.id);
		});
	}
  
	goBack() {
        this._location.back();
    }
	
	toggle_password() {
		this.showPassword = !this.showPassword;
    }

	onSelectContact(event) {
		console.log(event);
		this.selectedContact = event.label;
		this.student_id = event.value;
	}
	
	searchContact(event) {
		//this.contract.email = "";
		this.userService.searchStudentSuggestion(this.loggedInUser.id,event.query.toLowerCase()).subscribe(res => {	
			this.suggestions = [];
			this.suggestions = res;
			console.log(this.suggestions);
		});
    }
}
