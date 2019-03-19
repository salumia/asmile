import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigServiceService } from '../config-service.service';
import { ContractType } from './contract-type';
import { ContractTypeChangeResponse } from './contract-type-change-response';

@Injectable()
export class ContractTypeService {

  readonly apiUrl;

  constructor(private http: HttpClient, private auth: AuthService, config: ConfigServiceService) {
    this.apiUrl = config.getApiUrl();
  }

  getContractTypes() {
    const token = this.auth.getToken();
    return this.http.get<ContractType[]>(this.apiUrl + '/contract-type', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  getContractType(id: number) {
    const token = this.auth.getToken();
    return this.http.get<ContractType>(this.apiUrl + '/contract-type/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).map(res => {
      return res;
    });
  } 
   saveContractType(id: number, data: ContractType) {
    const token = this.auth.getToken();
	if(id > 0 ){
		return this.http.put<ContractTypeChangeResponse>(this.apiUrl + '/contract-type/' + id, data, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} else {
		return this.http.post<ContractTypeChangeResponse>(this.apiUrl + '/contract-type', data, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
  }
 
  deleteContractType(id: number) {
    const token = this.auth.getToken();
    return this.http.delete<ContractTypeChangeResponse>(this.apiUrl + '/contract-type/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
  disableContractType(id: number) {
    const token = this.auth.getToken();
    return this.http.post<ContractTypeChangeResponse>(this.apiUrl + '/contract-type/disable/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  enableContractType(id: number) {
    const token = this.auth.getToken();
    return this.http.post<ContractTypeChangeResponse>(this.apiUrl + '/contract-type/enable/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 
  
  getContractTypesList() {
	const token = this.auth.getToken();
	return this.http.get<any>(this.apiUrl + '/contract-type-list',{
	  headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 
  
}