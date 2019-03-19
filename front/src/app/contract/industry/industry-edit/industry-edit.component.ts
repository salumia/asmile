import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndustryService } from '../../industry.service';
import { Industry } from '../../industry';
import { Message, SelectItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location} from '@angular/common';

@Component({
  selector: 'app-industry-edit',
  templateUrl: './industry-edit.component.html',
  styleUrls: ['./industry-edit.component.css']
})
export class IndustryEditComponent implements OnInit {
	@ViewChild('documentsChild') documentsChild;
	id: number;
	industry: Industry = {} as Industry;
	msgs: Message[] = [];
	Industryform: FormGroup;
	loadComponents: boolean = false;
	loggedInUser: any;
	loadSpinner: boolean = false;

	constructor(aroute: ActivatedRoute, private router: Router, private industryService: IndustryService, private fb: FormBuilder, private auth: AuthService, private messageService: MessageService, private _location: Location) {
		aroute.params.subscribe(params => {
			this.id = params['id'];
			if(this.id > 0){
			  this.loadSpinner = true;
			}
		});
	}

	ngOnInit() {

		this.loggedInUser = this.auth.getAuth();

		this.Industryform = this.fb.group({
			'name': new FormControl('', Validators.required)
			});

		if(this.id > 0 ){
			this.loadIndustry();
		}
	}
  
	loadIndustry() {
		// Load Industry
		this.industryService.getIndustry(this.id).subscribe(res => {
		  this.industry = res;
		  this.loadComponents = true;
		  this.loadSpinner = false;
		});

	}
    
	saveIndustry() {
		console.log(this.industry);
		this.industryService.saveIndustry(this.id, this.industry).subscribe(res => {

			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: res.message});
			setTimeout(() => {
				this.router.navigate(['industries']);
			}, 2000);
		});
	}
	
	goBack() {
        this._location.back();
    }
}

