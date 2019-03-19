import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigServiceService } from '../config-service.service';
import { Set } from './set';
import { SetChangeResponse } from './set-change-response';

@Injectable()
export class SetService {

  readonly apiUrl;

  constructor(private http: HttpClient, private auth: AuthService, config: ConfigServiceService) {
    this.apiUrl = config.getApiUrl();
  }

  getUserSetsArray(id:number) {
    const token = this.auth.getToken();
    return this.http.get<any>(this.apiUrl + '/terms-set-array/user/'+id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 
  
  getUserSets(id:number) {
    const token = this.auth.getToken();
    return this.http.get<Set[]>(this.apiUrl + '/terms-set/user/'+id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
  getPartSets() {
    const token = this.auth.getToken();
    return this.http.get<Set[]>(this.apiUrl + '/terms-set', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
  getTerms(id: number) {
    const token = this.auth.getToken();
    return this.http.get<any>(this.apiUrl + '/terms-set/getTerms/'+id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
  getPartSet(id: number) {
    const token = this.auth.getToken();
    return this.http.get<Set>(this.apiUrl + '/terms-set/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).map(res => {
      return new Set(res);
    });
  } 
   saveSet(id: number, data: Set) {
    const token = this.auth.getToken();
	if(id > 0 ){
		return this.http.put<SetChangeResponse>(this.apiUrl + '/terms-set/' + id, data, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} else {
		return this.http.post<SetChangeResponse>(this.apiUrl + '/terms-set', data, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
  }
  
  saveSetTerms(id: number, data: any) {
    const token = this.auth.getToken();	
	return this.http.post<any>(this.apiUrl + '/terms-set/terms/'+id, data, {
		headers: {
			Authorization: 'Bearer ' + token
		}
	});
  }
  
  disableSet(id: number) {
    const token = this.auth.getToken();
    return this.http.post<SetChangeResponse>(this.apiUrl + '/terms-set/disable/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  enableSet(id: number) {
    const token = this.auth.getToken();
    return this.http.post<SetChangeResponse>(this.apiUrl + '/terms-set/enable/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 
  
  deleteSet(id: number) {
    const token = this.auth.getToken();
    return this.http.delete<SetChangeResponse>(this.apiUrl + '/terms-set/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
}