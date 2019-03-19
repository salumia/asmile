import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { PartService } from '../../part.service';
import { IndustryService } from '../../industry.service';
import { User } from '../../../user/user';
import { Part } from '../../part';
import { Message, SelectItem, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
  
export class PartListComponent implements OnInit {
	parts: Part[] = [];
	msgs: Message[] = [];
	loggedInUser: User;
	cols: any[];
	loadSpinner = true;
	industries: SelectItem[];
	statuses: SelectItem[];

	constructor(private authService: AuthService, private partService: PartService, private messageService: MessageService, private confirmationService: ConfirmationService, private industryService: IndustryService) {}

	
	ngOnInit() {
		this.cols = [
			{ field: 'title', header: 'Title' },
			{ field: 'internal_title', header: 'Internal Title' },
			{ field: 'get_industry_data.name', header: 'Industry' },
			{ field: 'status', header: 'Status' }
		];
		
		this.statuses = [
            { label: 'Select Status', value: null },
            { label: 'Enabled', value: '1' },
            { label: 'Disabled', value: '0' }
        ];
		
		this.industryService.getIndustryList().subscribe(res => {
		  this.industries = res;
		  this.industries.unshift({ label: 'Select Industry', value: null });
		});
		  	
		this.loggedInUser = this.authService.getAuth();
		this.loadParts();
	}

	loadParts() {
		this.partService.getUserParts(this.loggedInUser.id).subscribe(
			res => { 
					this.parts = res;
					this.loadSpinner = false; 
			}
		);
	}
	
	deletePart(id: number) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.partService.deletePart(id).subscribe(res => {		
					this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Part Deleted', detail: res.message});
					// Reload industries
					this.loadParts();
				});
            }
        });
	}
	
	disablePart(id: number) {
		this.partService.disablePart(id).subscribe(res => {		
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Part Updated', detail: res.message});
			// Reload industries
			this.loadParts();
		});
	}

	enablePart(id) {
		this.partService.enablePart(id).subscribe(res => {
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Part Updated', detail: res.message});

			// Reload industries
			this.loadParts();

		});
	}
}
