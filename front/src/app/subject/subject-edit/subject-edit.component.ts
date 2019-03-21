import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../subject.service';
import { Subject } from '../subject';
import { Message, SelectItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location} from '@angular/common';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
	@ViewChild('documentsChild') documentsChild;
	id: number;
	subject: Subject = {} as Subject;
	msgs: Message[] = [];
	Subjectform: FormGroup;
	loadComponents: boolean = false;
	loggedInUser: any;
	loadSpinner: boolean = false;

	constructor(aroute: ActivatedRoute, private router: Router, private subjectService: SubjectService, private fb: FormBuilder, private auth: AuthService, private messageService: MessageService, private _location: Location) {
		aroute.params.subscribe(params => {
			this.id = params['id'];
			if(this.id > 0){
			  this.loadSpinner = true;
			}
		});
	}

	ngOnInit() {

		this.loggedInUser = this.auth.getAuth();

		this.Subjectform = this.fb.group({
			'name': new FormControl('', Validators.required)
			});

		if(this.id > 0 ){
			this.loadSubject();
		}
	}
  
	loadSubject() {
		// Load subject
		this.subjectService.getSubject(this.id).subscribe(res => {
		  this.subject = res;
		  this.loadComponents = true;
		  this.loadSpinner = false;
		});

	}
    
	saveSubject() {
		this.subjectService.saveSubject(this.id, this.subject).subscribe(res => {

			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: res.message});
			setTimeout(() => {
				this.router.navigate(['subjects']);
			}, 2000);
		});
	}
	
	goBack() {
        this._location.back();
    }
}

