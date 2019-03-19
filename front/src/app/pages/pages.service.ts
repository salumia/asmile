import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigServiceService } from '../config-service.service';
import { Pages } from './pages';
import { PagesChangeResponse } from './pages-change-response';

@Injectable()
export class PagesService {

	readonly apiUrl;

    constructor(private http: HttpClient, private auth: AuthService, config: ConfigServiceService) {
        this.apiUrl = config.getApiUrl();
    }

    getPages() {
        const token = this.auth.getToken();
        return this.http.get<Pages[]>(this.apiUrl + '/pages', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }    	
	
	updateDocs(id:number,data:any) {		
        const token = this.auth.getToken();
        return this.http.post<any>(this.apiUrl + '/updatepagedocs',{'id':id,'files':data}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }	
	
	deleteFile(id:number,data:any) {		
        const token = this.auth.getToken();
        return this.http.post<any>(this.apiUrl + '/deletefile',{'id':id,'file':data}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }	
	
	deleteCoverImage(id:number,data:any) {		
        const token = this.auth.getToken();
        return this.http.post<any>(this.apiUrl + '/deletecoverimage',{'id':id,'file':data}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    getPage(id: number) {
        const token = this.auth.getToken();
        return this.http.get<Pages>(this.apiUrl + '/pages/' + id, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).map(res => {
                return new Pages(res);
            });
    }

    savePage(id:number, data: Pages) {
        const token = this.auth.getToken();
        if(id > 0 ){
            return this.http.put<PagesChangeResponse>(this.apiUrl + '/pages/'+id, data, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
        } else {
            return this.http.post<PagesChangeResponse>(this.apiUrl + '/pages', data, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
    }

    deletePage(id: Number) {
        const token = this.auth.getToken();
        return this.http.delete<Pages[]>(this.apiUrl + '/pages/'+id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
	
	getFile(){	
		
	}
}
