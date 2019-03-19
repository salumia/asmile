import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TemplateConfigService {

	private _listners = new Subject<any>();

	constructor(private router: Router) { }

	loadComponent(name: string) {
		switch(name) {
		case 'sidebar':
			return (this.router.url != '/login');
		}
		return true;
	}
	
    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    filter(filterBy: any) {
       this._listners.next(filterBy);
    }
  
}