import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SubjectService } from '../subject.service';
import { User } from '../../user/user';
import { Subject } from '../subject';
import { Message, SelectItem, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
	subjects: Subject[] = [];
	msgs: Message[] = [];
	loggedInUser: User;
	cols: any[];
	loadSpinner = true;
	statuses: SelectItem[];

	constructor(private authService: AuthService, private subjectService: SubjectService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

	ngOnInit() {
		this.cols = [
			{ field: 'name', header: 'Name' },
			{ field: 'status', header: 'Status' }
		];
		
		this.statuses = [
            { label: 'Status', value: null },
            { label: 'Enabled', value: '1' },
            { label: 'Disabled', value: '0' }
        ];
				
		this.loggedInUser = this.authService.getAuth();
		this.loadSubjects();
	}

	loadSubjects() {
		this.subjectService.getSubjects(this.loggedInUser.id, this.loggedInUser.role).subscribe(res => { 
		console.log(res);
					this.subjects = res;
					this.loadSpinner = false; 
				}
			);
	}
	
	deleteSubject(id: number) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.subjectService.deleteSubject(id).subscribe(res => {
					console.log(res)
					if(res.statusCode == 202){
						this.messageService.add({key: 'top-corner', severity: 'error', summary: 'Error', detail: res.message});
					} else {
						this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Subject Deleted', detail: res.message});
						// Reload Categories
						this.loadSubjects();
					}
				});
            }
        });
	}
	
	disableSubject(id: number) {
		this.subjectService.disableSubject(id).subscribe(res => {		
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Subject Updated', detail: res.message});
			// Reload subjects
			this.loadSubjects();
		});
	}

	enableSubject(id) {
		this.subjectService.enableSubject(id).subscribe(res => {
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Subject Updated', detail: res.message});

			// Reload subjects
			this.loadSubjects();

		});
	}
}
