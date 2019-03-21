import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigServiceService } from '../config-service.service';
import { Subject } from './subject';
import { SubjectChangeResponse } from './subject-change-response';

@Injectable()
export class SubjectService {

  readonly apiUrl;

  constructor(private http: HttpClient, private auth: AuthService, config: ConfigServiceService) {
    this.apiUrl = config.getApiUrl();
  }
	
  getSubjectList() {
	const token = this.auth.getToken();
	return this.http.get<any>(this.apiUrl + '/subject-list',{
	  headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 
  
  
  getSubjects() {
    const token = this.auth.getToken();
    return this.http.get<Subject[]>(this.apiUrl + '/subject', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
  getSubject(id: number) {
    const token = this.auth.getToken();
    return this.http.get<Subject>(this.apiUrl + '/subject/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).map(res => {
      return new Subject(res);
    });
  } 
   
   saveSubject(id: number, data: Subject) {
    const token = this.auth.getToken();
	if(id > 0 ){
		return this.http.put<SubjectChangeResponse>(this.apiUrl + '/subject/' + id, data, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} else {
		return this.http.post<SubjectChangeResponse>(this.apiUrl + '/subject', data, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
  }
  
  deleteSubject(id: number) {
    const token = this.auth.getToken();
    return this.http.delete<SubjectChangeResponse>(this.apiUrl + '/subject/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
  disableSubject(id: number) {
    const token = this.auth.getToken();
    return this.http.post<SubjectChangeResponse>(this.apiUrl + '/subject/disable-subject/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  enableSubject(id: number) {
    const token = this.auth.getToken();
    return this.http.post<SubjectChangeResponse>(this.apiUrl + '/subject/enable-subject/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 
  
}