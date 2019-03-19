import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PagesService } from '../pages.service';
import { Pages } from '../Pages';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	msgs = [];
    pages: Pages[];
    cols: any[];

    constructor(private pageService: PagesService, private authService: AuthService, private confirmService: ConfirmationService, private messageService: MessageService) { }

    ngOnInit() {
        this.loadPages();

        this.cols = [
            { field: 'title', header: 'Title' },
            { field: 'type', header: 'Type' }
        ];
    }

    loadPages() {
        this.pageService.getPages().subscribe(
            res => {
                this.pages = res;
                console.log(this.pages);
            }
        );
    }

    deletePage(page) {
        this.confirmService.confirm({
            message: 'Are you sure that you want to perform this action?',
            key: 'deletePage',
            accept: () => {
                /****** Call Delete Page Service ******/
                this.pageService.deletePage(page.id).subscribe(
                    response => {
                        if (response instanceof HttpErrorResponse) {
                            this.messageService.add({key: 'top-corner', severity: 'error', summary: 'Error:', detail: response.error.message});
                        } else {
                            this.pages.splice(this.pages.indexOf(page), 1);
                            this.messageService.add({key: 'top-corner', severity: 'success', summary: 'Success', detail: 'Page deleted successfully'});
                        }
                    },
                    error => {
                        this.messageService.add({key: 'top-corner', severity: 'error', summary: 'Error:', detail: error.message});
                });
                /**************************************/
            }
        });        
    }

}
