import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { CategoryService } from '../../category.service';
import { IndustryService } from '../../industry.service';
import { User } from '../../../user/user';
import { Category } from '../../category';
import { Message, SelectItem, ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
  
export class ListComponent implements OnInit {
	categories: Category[] = [];
	msgs: Message[] = [];
	loggedInUser: User;
	cols: any[];
	loadSpinner = true;
	statuses: SelectItem[];
	industries: SelectItem[];

	constructor(private authService: AuthService, private categoryService: CategoryService, private messageService: MessageService, private confirmationService: ConfirmationService, private industryService: IndustryService) {}

	ngOnInit() {
		this.cols = [
			{ field: 'get_industry_data.name', header: 'Industry' },
			{ field: 'name', header: 'Name' },
			{ field: 'status', header: 'Status' }
		];
		
		this.statuses = [
            { label: 'Status', value: null },
            { label: 'Enabled', value: '1' },
            { label: 'Disabled', value: 'disabled' }
        ];
		
		this.industryService.getIndustryList().subscribe(res => {
		  this.industries = res;
		  this.industries.unshift({ label: 'Select Industry', value: null });
		});
		
		this.loadCategories();
		this.loggedInUser = this.authService.getAuth();
	}

	loadCategories() {
		this.categoryService.getCategories().subscribe(res =>  { 
				this.categories = res;
				this.loadSpinner = false; 
			}
		);
	}
	
	deleteCategory(id: number) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.categoryService.deleteCategory(id).subscribe(res => {		
					this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Category Deleted', detail: res.message});
					// Reload Categories
					this.loadCategories();
				});
            }
        });
	}
	
	disableCategory(id: number) {
		this.categoryService.disableCategory(id).subscribe(res => {		
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Category Updated', detail: res.message});
			// Reload Categories
			this.loadCategories();
		});
	}

	enableCategory(id) {
		this.categoryService.enableCategory(id).subscribe(res => {
			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Category Updated', detail: res.message});

			// Reload Categories
			this.loadCategories();

		});
	}
}
