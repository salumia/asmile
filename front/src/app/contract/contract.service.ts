import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigServiceService } from '../config-service.service';
import { Contract } from './contract';
import { ContractChangeResponse } from './contract-change-response';

@Injectable()
export class ContractService {

  readonly apiUrl;

  constructor(private http: HttpClient, private auth: AuthService, config: ConfigServiceService) {
    this.apiUrl = config.getApiUrl();
  }
  
	updateContractTerms(id: number, user: number, contract_parts: any, edited_parts: any, sender:boolean ) {
		const token = this.auth.getToken();
		return this.http.post<any>(this.apiUrl + '/contract/updateparts/'+id+'/'+user, { contract_parts : contract_parts, edited_parts : edited_parts,  sender :  sender }, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
	
	saveContractTerms(id: number, data: any, user: number) {
		const token = this.auth.getToken();
		return this.http.post<any>(this.apiUrl + '/contract/saveparts/'+id+'/'+user, data, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
  
	saveContract(id: number, data: Contract) {
		const token = this.auth.getToken();
		if(id > 0 ){
			return this.http.put<ContractChangeResponse>(this.apiUrl + '/contract/' + id, data, {
			  headers: {
				Authorization: 'Bearer ' + token
			  }
			});
		} else {
			return this.http.post<ContractChangeResponse>(this.apiUrl + '/contract', data, {
				headers: {
					Authorization: 'Bearer ' + token
				}
			});
		}
	}
	
	loadAllContracts() {
		const token = this.auth.getToken();
		return this.http.get<any>(this.apiUrl + '/contract', {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	}
	
	loadContracts(id:number, role:string) {
		const token = this.auth.getToken();
		return this.http.get<any>(this.apiUrl + '/contract/user/'+id+'/'+role, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	}
		
	deleteContract(id: number) {
		const token = this.auth.getToken();
		return this.http.delete<ContractChangeResponse>(this.apiUrl + '/contract/' + id, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	}
	
	getContract(id: number) {
		const token = this.auth.getToken();
		return this.http.get<Contract>(this.apiUrl + '/contract/' + id, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		}).map(res => {
		  return new Contract(res);
		});
	}

	getContractLog(id: number) {
		const token = this.auth.getToken();
		return this.http.get<any>(this.apiUrl + '/contract/log/' + id, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} 
	
	
	getPartComparisonData(id: number) {
		const token = this.auth.getToken();
		return this.http.get<any>(this.apiUrl + '/contract/part/' + id, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		}).map(res => {
		  return res;
		});
	} 
		
	updateContractStatus(id: number, status:number, signature="") {
		const token = this.auth.getToken();
		return this.http.post<ContractChangeResponse>(this.apiUrl + '/contract/update-status/' + id, { status:status,signature:signature }, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	} 
	
	openContract(id:number){
		const token = this.auth.getToken();
		return this.http.post<ContractChangeResponse>(this.apiUrl + '/contract/open/' + id, null, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} 
	
	updateNotifications(id:number, role = 'user', ref_id:number, page='review') {
		const token = this.auth.getToken();
		return this.http.post<any>(this.apiUrl + '/notification/view/user/'+id,{ role:role, ref_id:ref_id, page: page}, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	}
  
}