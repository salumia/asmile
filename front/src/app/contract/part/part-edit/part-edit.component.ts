import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartService } from '../../part.service';
import { IndustryService } from '../../industry.service';
import { Part } from '../../part';
import { Industry } from '../../industry';
import { Message, SelectItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location} from '@angular/common';

@Component({
  selector: 'app-part-edit',
  templateUrl: './part-edit.component.html',
  styleUrls: ['./part-edit.component.css']
})
export class PartEditComponent implements OnInit {
	@ViewChild('documentsChild') documentsChild;
	id: number;
	part: Part = { type:0 } as Part;
	msgs: Message[] = [];
	partform: FormGroup;
	loadComponents: boolean = false;
	loggedInUser: any;
	loadSpinner: boolean = false;
	
	industries: SelectItem[];

	constructor(aroute: ActivatedRoute, private router: Router, private partService: PartService,private industryService: IndustryService, private fb: FormBuilder, private auth: AuthService, private messageService: MessageService, private _location: Location) {
		aroute.params.subscribe(params => {
			this.id = params['id'];
			if(this.id > 0){
			  this.loadSpinner = true;
			}
		});
	}

	ngOnInit() {
		this.loggedInUser = this.auth.getAuth();
		this.loadIndustries();
		this.partform = this.fb.group({
				'industry_id': new FormControl('', Validators.required),
				'title': new FormControl('', Validators.required),
				'internal_title': new FormControl('', Validators.required),
				'body': new FormControl('', Validators.required),
				'type': new FormControl(''),
				'user_id': new FormControl(''),
			});

		if(this.id > 0 ){
			this.loadPart();
		}
	}
	
	loadIndustries() {
		this.industryService.getIndustryList().subscribe(res => {
		  this.industries = res;
		  this.industries.unshift({label: 'Select', value: ''});
		});
	}
  
	loadPart() {
		// Load Part
		this.partService.getPart(this.id).subscribe(res => {
		  this.part = res;
		  this.loadComponents = true;
		  this.loadSpinner = false;
		});

	}
    
	savePart() {
		this.part.user_id = this.loggedInUser.id;
		console.log(this.part);
		this.partService.savePart(this.id, this.part).subscribe(res => {

			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: res.message});
			setTimeout(() => {
				this.router.navigate(['parts']);
			}, 2000);
		});
	}
	
	goBack() {
        this._location.back();
    }
}

