import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Message, SelectItem, ConfirmationService } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location} from '@angular/common';

@Component({
  selector: 'app-manage-parent-students',
  templateUrl: './manage-parent-students.component.html',
  styleUrls: ['./manage-parent-students.component.css']
})
export class ManageParentStudentsComponent implements OnInit {
@ViewChild('documentsChild') documentsChild;
	id: number;
	user: User = {} as User;
	msgs: Message[] = [];
	Userform: FormGroup;
	loggedInUser: any;
	loadSpinner: boolean = false;
	editMode: boolean = false;
		
	showPassword: boolean;
	linkedStudents = [];
	cols: any[];
	statuses: SelectItem[];
	
	addContactVisible = false;
	suggestions: any[];
	student_id:number = 0;	
	
	Searchform: FormGroup;
	
	constructor(aroute: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder, private auth: AuthService, private messageService: MessageService, private _location: Location, private confirmationService: ConfirmationService) {
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

		this.Searchform = this.fb.group({
			'student': new FormControl('', Validators.required)
		});
		
		this.loggedInUser = this.auth.getAuth();
		
		this.cols = [
			{ field: 'get_student_data.name', header: 'Name' },
			{ field: 'get_student_data.status', header: 'Status' },
		];
		
		this.statuses = [		
            { label: 'Status', value: null },
            { label: 'Enabled', value: 'user' },
            { label: 'Disabled', value: 'disabled' }
        ];
		
		if(this.id > 0 ){
			this.loadUser();
		}
		
		
	}
  
	loadUser() {	
		this.userService.getUser(this.id).subscribe(res => {
		  this.user = res;		  
		  this.loadUserStudents();
		  this.loadSuggestions();
		});
	}	
	
	loadUserStudents() {	
		this.userService.getUserStudents(this.id).subscribe(res => {
		  this.linkedStudents = res;
		  this.loadSpinner = false;
		});
	}
	
	goBack() {
        this._location.back();
    }
	
	showAddContactDialog() {
		this.addContactVisible = true;
	}
	
	addSearchStudent(){
		this.userService.createLink(this.id, this.student_id).subscribe(res => {				
				if(res.data.id > 0 ){
					this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: "Student assigned successfully"});
				}									
				this.addContactVisible = false;
				this.student_id = 0;
				// Reload Students
				this.loadUserStudents();
				this.loadSuggestions();
				setTimeout(() => {
					this.msgs = [];     									
				}, 2000);
		});	
	}
	
	onSelectContact(event) {
		console.log(event);
		this.student_id = event.value;		
	}
	
	loadSuggestions() {
		this.student_id = 0;
		if(this.loggedInUser.role == 'admin'){
			this.userService.searchStudentSuggestion(this.id).subscribe(res => {	
				this.suggestions = [];
				this.suggestions = res;
			});
		} else {
			this.userService.searchStudentSuggestion(this.id,'a',this.loggedInUser.id).subscribe(res => {	
				this.suggestions = [];
				this.suggestions = res;
			});
		}		
    }
	
	removeStudent(index:number){
		this.confirmationService.confirm({
			message: 'Are you sure ?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.userService.removeStudent(index).subscribe(res => {					
					this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Student Removed', detail: res.message});					
					this.loadUserStudents();
				});
            }
        });
	}
}
