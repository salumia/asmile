import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';
import { Message, SelectItem, ConfirmationService } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location} from '@angular/common';

@Component({
  selector: 'app-manage-user-subjects',
  templateUrl: './manage-user-subjects.component.html',
  styleUrls: ['./manage-user-subjects.component.css']
})
export class ManageUserSubjectsComponent implements OnInit {
@ViewChild('documentsChild') documentsChild;
	id: number;
	user: User = {} as User;
	msgs: Message[] = [];
	Userform: FormGroup;
	loggedInUser: any;
	loadSpinner: boolean = false;
	editMode: boolean = false;
		
	showPassword: boolean;
	enrolledSubjects = [];
	cols: any[];
	statuses: SelectItem[];
	
	addContactVisible = false;
	suggestions: any[];
	subject_id:number = 0;	
	
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
			'subject': new FormControl('', Validators.required)
		});
		
		this.loggedInUser = this.auth.getAuth();
		
		this.cols = [
			{ field: 'get_subject_data.name', header: 'Subject' },
			{ field: 'get_subject_data.status', header: 'Status' },
		];
		
		this.statuses = [
            { label: 'Status', value: null },
            { label: 'Enabled', value: 1 },
            { label: 'Disabled', value: 0 }
        ];
		
		if(this.id > 0 ){
			this.loadUser();
		}
		
		
	}
  
	loadUser() {	
		this.userService.getUser(this.id).subscribe(res => {
		  this.user = res;		  
		  this.loadStudentSubjects();
		  this.loadSuggestions();
		});
	}	
	
	loadStudentSubjects() {	
		this.userService.getStudentSubjects(this.id).subscribe(res => {
		  this.enrolledSubjects = res;
		  this.loadSpinner = false;
		});
	}
	
	goBack() {
        this._location.back();
    }
	
	showAddContactDialog() {
		this.addContactVisible = true;
	}
	
	addSearchSubject(){
		if(this.loggedInUser.role == 'admin'){
			this.userService.addNewSubject(this.id, this.subject_id).subscribe(res => {
				this.msgs.push({severity: 'success', summary: 'Subject', detail: 'Subject added to student list'});
				this.addContactVisible = false;
				this.subject_id = 0;
				// Reload Subjects
				this.loadStudentSubjects();
				this.loadSuggestions();
				setTimeout(() => {
					this.msgs = [];     									
				}, 2000);
			});
		} else {
			this.userService.addNewSubject(this.id, this.subject_id, this.loggedInUser.id).subscribe(res => {
				this.msgs.push({severity: 'success', summary: 'Subject', detail: 'Subject added to student list'});
				this.addContactVisible = false;
				this.subject_id = 0;
				// Reload Subjects
				this.loadStudentSubjects();
				this.loadSuggestions();
				setTimeout(() => {
					this.msgs = [];     									
				}, 2000);
			});
		}		
	}
	
	onSelectContact(event) {
		console.log(event);
		this.subject_id = event.value;		
	}
	
	searchContact(event) {
		this.subject_id = 0;
		this.userService.subjectSuggestion(this.id,event.query.toLowerCase()).subscribe(res => {	
			this.suggestions = [];
			this.suggestions = res;
		});
    }
	
	loadSuggestions() {
		this.subject_id = 0;
		if(this.loggedInUser.role == 'admin'){
			this.userService.subjectSuggestion(this.id).subscribe(res => {	
				this.suggestions = [];
				this.suggestions = res;
			});
		} else {
			this.userService.subjectSuggestion(this.id,'a',this.loggedInUser.id).subscribe(res => {	
				this.suggestions = [];
				this.suggestions = res;
			});
		}		
    }
	
	removeSubject(index:number){
		this.confirmationService.confirm({
			message: 'Are you sure ?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.userService.removeStudentSubject(index).subscribe(res => {					
					this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Subject Removed', detail: res.message});
					// Reload Categories
					this.loadStudentSubjects();
				});
            }
        });
	}
}
