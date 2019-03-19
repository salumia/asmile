import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpErrorResponse } from '@angular/common/http';
import { PagesService } from '../pages.service';
import { ConfigServiceService } from '../../config-service.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
	
	id: number;
	page: any = { files:[]};
	baseUrl: any;
	
	constructor(aroute: ActivatedRoute, private router: Router, private pageService: PagesService, private messageService: MessageService, private configService: ConfigServiceService, private _location: Location) {		
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		aroute.params.subscribe(params => {
			this.id = params['id'];
			if(this.id > 0 ){
				this.loadPage();
			}
		});
	}
	
	ngOnInit() {	
		this.baseUrl = this.configService.getBaseUrl();
		console.log(this.baseUrl);
	}
	
	loadPage() {
        // Load Page
        this.pageService.getPage(this.id).subscribe(res => {
            this.page = res;
            console.log(res);
        });		
		console.log(this.page);
    }
	
	downloadFile(){
		console.log('downloadFile');
		
	}
	
	goBack() {
        this._location.back();
    }

}
