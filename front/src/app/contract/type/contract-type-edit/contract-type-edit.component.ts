import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractTypeService } from '../../contract-type.service';
import { ContractType } from '../../contract-type';
import { Message, SelectItem } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Location} from '@angular/common';

@Component({
  selector: 'app-contract-type-edit',
  templateUrl: './contract-type-edit.component.html',
  styleUrls: ['./contract-type-edit.component.css']
})
export class ContractTypeEditComponent implements OnInit {
	@ViewChild('documentsChild') documentsChild;
	id: number;
	contractType: ContractType = {} as ContractType;
	msgs: Message[] = [];
	contractTypeform: FormGroup;
	loadComponents: boolean = false;
	loggedInUser: any;
	loadSpinner: boolean = false;

	constructor(aroute: ActivatedRoute, private router: Router, private contractTypeService: ContractTypeService, private fb: FormBuilder, private auth: AuthService, private messageService: MessageService, private _location: Location) {
		aroute.params.subscribe(params => {
			this.id = params['id'];
			if(this.id > 0){
			  this.loadSpinner = true;
			}
		});
	}

	ngOnInit() {

		this.loggedInUser = this.auth.getAuth();

		this.contractTypeform = this.fb.group({
			'name': new FormControl('', Validators.required)
			});

		if(this.id > 0 ){
			this.getContractType();
		}
	}
  
	getContractType() {
		// Load ContractType
		this.contractTypeService.getContractType(this.id).subscribe(res => {
			console.log('getContractType');
			console.log(res);
		  this.contractType = res;
		  this.loadComponents = true;
		  this.loadSpinner = false;
		});

	}
    
	saveContractType() {
		console.log(this.contractType);
		this.contractTypeService.saveContractType(this.id, this.contractType).subscribe(res => {

			this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: res.message});
			setTimeout(() => {
				this.router.navigate(['contract/types']);
			}, 2000);
		});
	}
	
	goBack() {
        this._location.back();
    }
}


