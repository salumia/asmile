import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ContractTypeService } from '../../contract-type.service';
import { User } from '../../../user/user';
import { ContractType } from '../../contract-type';
import { Message, SelectItem, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-contract-type-list',
  templateUrl: './contract-type-list.component.html',
  styleUrls: ['./contract-type-list.component.css']
})
  
export class ContractTypeListComponent implements OnInit {
	contractTypes: ContractType[] = [];
	msgs: Message[] = [];
	loggedInUser: User;
	cols: any[];
	loadSpinner = true;
	statuses: SelectItem[];
	
	constructor(private authService: AuthService, private contractTypeService: ContractTypeService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

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
		  
		this.loadContractTypes();
		this.loggedInUser = this.authService.getAuth();
	}

	loadContractTypes() {
		this.contractTypeService.getContractTypes().subscribe(res => { 
				this.contractTypes = res;
				this.loadSpinner = false;
			}
		);
	}
	
	deleteContractType(id: number) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.contractTypeService.deleteContractType(id).subscribe(res => {		
					this.messageService.add({key: 'top-corner', severity: 'success', summary: 'ContractType Deleted', detail: res.message});
					// Reload ContractTypes
					this.loadContractTypes();
				});
            }
        });
	}
	
	disableContractType(id: number) {
		this.contractTypeService.disableContractType(id).subscribe(res => {		
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'ContractType Updated', detail: res.message});
			// Reload ContractTypes
			this.loadContractTypes();
		});
	}

	enableContractType(id) {
		this.contractTypeService.enableContractType(id).subscribe(res => {
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'ContractType Updated', detail: res.message});

			// Reload ContractTypes
			this.loadContractTypes();

		});
	}
}
