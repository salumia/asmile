import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigServiceService } from '../config-service.service';
import { Industry } from './industry';
import { IndustryChangeResponse } from './industry-change-response';

@Injectable()
export class IndustryService {

  readonly apiUrl;

  constructor(private http: HttpClient, private auth: AuthService, config: ConfigServiceService) {
    this.apiUrl = config.getApiUrl();
  }
	
  getIndustryList() {
	const token = this.auth.getToken();
	return this.http.get<any>(this.apiUrl + '/industry-list',{
	  headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 
  
  getIndustries() {
    const token = this.auth.getToken();
    return this.http.get<Industry[]>(this.apiUrl + '/industry', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  getIndustry(id: number) {
    const token = this.auth.getToken();
    return this.http.get<Industry>(this.apiUrl + '/industry/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).map(res => {
      return new Industry(res);
    });
  } 
   saveIndustry(id: number, data: Industry) {
    const token = this.auth.getToken();
	if(id > 0 ){
		return this.http.put<IndustryChangeResponse>(this.apiUrl + '/industry/' + id, data, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} else {
		return this.http.post<IndustryChangeResponse>(this.apiUrl + '/industry', data, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
  }
  
  deleteIndustry(id: number) {
    const token = this.auth.getToken();
    return this.http.delete<IndustryChangeResponse>(this.apiUrl + '/industry/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
  disableIndustry(id: number) {
    const token = this.auth.getToken();
    return this.http.post<IndustryChangeResponse>(this.apiUrl + '/industry/disable-industry/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  enableIndustry(id: number) {
    const token = this.auth.getToken();
    return this.http.post<IndustryChangeResponse>(this.apiUrl + '/industry/enable-industry/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 
  
}