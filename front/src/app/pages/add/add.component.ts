import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpErrorResponse } from '@angular/common/http';
import { PagesService } from '../pages.service';
import { ConfigServiceService } from '../../config-service.service';
import { TemplateConfigService } from '../../template/template-config.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	@Output() onFilter: any = new EventEmitter();
	title: any = 'Create';
	id: number;
	page: any = {cover_image:'', files:[]};
	page_types: any;
    msgs = [];
    Pageform: FormGroup;
    submitted: boolean;
	
	redirectTemplate:boolean = false;
	contentTemplate:boolean = false;
	uploadedFiles: any[] = [];
	uploadedDocs: any[] = [];
	coverImage: any[] = [];
	tempCoverImage: any[] = [];;
	readonly apiUrl;
	readonly baseUrl;
	
    constructor(aroute: ActivatedRoute, private router: Router, private fb: FormBuilder, private pageService: PagesService, private messageService: MessageService, config: ConfigServiceService, private templateService: TemplateConfigService, private _location: Location) {
		this.apiUrl = config.getApiUrl();
		this.baseUrl = config.getBaseUrl();
        aroute.params.subscribe(params => {
            this.id = params['id'];
        });
	
	this.page_types = [
			{label: 'Content Page', value: '1'},
			{label: 'Redirect Page', value: '2'}
		];
	}

	ngOnInit() {		
		this.Pageform = this.fb.group({
			'title': new FormControl('', Validators.required),            
			'type': new FormControl('', Validators.required),
			'description': new FormControl(''),
			'redirect_url': new FormControl('')
		});
		if(this.id > 0){
			this.loadPage();
			this.title = 'Edit';
		}
	}
	
	loadPage() {
        // Load Page
        this.pageService.getPage(this.id).subscribe(res => {
            this.page = res;
			console.log(this.page);
			this.changeTemplate(this.page.type);
        });		
    }
	
	changeTemplate(pageType){
		this.redirectTemplate = this.contentTemplate = false;		
		if(pageType == 1){
			this.contentTemplate = true;
		} else if(pageType == 2){
			this.redirectTemplate = true;
			this.Pageform.controls['redirect_url'].setValidators(Validators.required);
		}
	}
  
	onUpload(event) {
		this.uploadedDocs = JSON.parse(event.xhr.response).upoadedfiles ;
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }	
	
	onCoverImageUpload(event) {
		this.coverImage = JSON.parse(event.xhr.response).upoadedfiles ;
        for(let file of event.files) {
            this.tempCoverImage.push(file);
        }
		console.log(this.tempCoverImage);
		console.log(this.coverImage);
    }
	
	savePageData(data:any){
		console.log(data);
		
		if(this.coverImage.length > 0){
			data.cover_image = this.coverImage[0][0];
		}
		
		console.log(this.page);
		
        /****** Call Save Page Service ******/
        this.pageService.savePage(this.id, data).subscribe(
            response => {
                if (response instanceof HttpErrorResponse) {
                    this.messageService.add({key: 'top-corner', severity: 'error', summary: 'Error:', detail: response.error.message});
                } else {
					if(response.pages.id > 0){
						console.log(this.uploadedDocs);
						if(response.pages.type == 1){
							if(this.uploadedDocs.length > 0 ){
								this.pageService.updateDocs(response.pages.id,this.uploadedDocs).subscribe(
									res => {
										console.log(res);
									}
								);
							}
						}
                    }
					this.templateService.filter('header refresh');
                    this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: 'Page added successfully'});                                      
                    setTimeout(() => {
                        this.router.navigate(['pages/list']);
                    }, 2000);
                }
            },
            error => {
                this.messageService.add({key: 'top-corner', severity: 'error', summary: 'Error:', detail: error.message});
            });
        /**************************************/       
    }
	
	deleteFile(file){
		console.log(file);
		/****** Call Save Page Service ******/
        this.pageService.deleteFile(this.id, file).subscribe(
            response => {
                if (response instanceof HttpErrorResponse) {
                    this.messageService.add({key: 'top-corner', severity: 'error', summary: 'Error:', detail: response.error.message});
                } else {
					this.loadPage();
					this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: 'File deleted successfully'}); 
				}			
		})
	}	
	
	deleteCoverImage(file){
		console.log(file);
		/****** Call Save Page Service ******/
        this.pageService.deleteCoverImage(this.id, file).subscribe(
            response => {
                if (response instanceof HttpErrorResponse) {
                    this.messageService.add({key: 'top-corner', severity: 'error', summary: 'Error:', detail: response.error.message});
                } else {
					this.page.cover_image = '';
					this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: 'Cover Image deleted successfully'}); 
				}			
		})
	}
	
	goBack() {
        this._location.back();
    }
}
