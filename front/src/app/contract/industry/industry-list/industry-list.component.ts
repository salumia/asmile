import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { IndustryService } from '../../industry.service';
import { User } from '../../../user/user';
import { Industry } from '../../industry';
import { IndustryChangeResponse } from '../../industry-change-response';
import { Message, SelectItem, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.css']
})
  
export class IndustryListComponent implements OnInit {
	industries: Industry[] = [];
	msgs: Message[] = [];
	loggedInUser: User;
	cols: any[];
	loadSpinner = true;
	statuses: SelectItem[];

	constructor(private authService: AuthService, private industryService: IndustryService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

	ngOnInit() {
		this.cols = [
			/* { field: 'id', header: 'Id' }, */
			{ field: 'name', header: 'Name' },
			{ field: 'status', header: 'Status' }
		];
		
		this.statuses = [
            { label: 'Status', value: null },
            { label: 'Enabled', value: '1' },
            { label: 'Disabled', value: '0' }
        ];
		
		this.loadIndustries();
		this.loggedInUser = this.authService.getAuth();
	}

	loadIndustries() {
		this.industryService.getIndustries().subscribe(res => { 
					this.industries = res;
					this.loadSpinner = false; 
				}
			);
	}
	
	deleteIndustry(id: number) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.industryService.deleteIndustry(id).subscribe(res => {
					console.log(res)
					if(res.statusCode == 202){
						this.messageService.add({key: 'top-corner', severity: 'error', summary: 'Error', detail: res.message});
					} else {
						this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Industry Deleted', detail: res.message});
						// Reload Categories
						this.loadIndustries();
					}
				});
            }
        });
	}
	
	disableIndustry(id: number) {
		this.industryService.disableIndustry(id).subscribe(res => {		
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Industry Updated', detail: res.message});
			// Reload industries
			this.loadIndustries();
		});
	}

	enableIndustry(id) {
		this.industryService.enableIndustry(id).subscribe(res => {
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Industry Updated', detail: res.message});

			// Reload industries
			this.loadIndustries();

		});
	}
}
