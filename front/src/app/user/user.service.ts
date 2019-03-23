import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigServiceService } from '../config-service.service';
import { User } from './user';
import { Admin } from './admin';
import { UserChangeResponse } from './user-change-response';
import { AdminChangeResponse } from './admin-change-response';

@Injectable()
export class UserService {

  readonly apiUrl;

  constructor(private http: HttpClient, private auth: AuthService, config: ConfigServiceService) {
    this.apiUrl = config.getApiUrl();
  }
  
  getUsers() {
    const token = this.auth.getToken();
    return this.http.get<User[]>(this.apiUrl + '/users', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
  
  getAdmin(id: number) {
    const token = this.auth.getToken();
    return this.http.get<Admin>(this.apiUrl + '/admin/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).map(res => {
      return new Admin(res);
    });
  } 
     
  getUser(id: number) {
    const token = this.auth.getToken();
    return this.http.get<User>(this.apiUrl + '/users/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).map(res => {
      return new User(res);
    });
  }
    
  saveAdmin(id: number, data: Admin) {
    const token = this.auth.getToken();
	  if(id > 0 ){
		return this.http.put<AdminChangeResponse>(this.apiUrl + '/admin/' + id, data, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} else {
		return this.http.post<AdminChangeResponse>(this.apiUrl + '/admin', data, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	  }
  }
  
  saveUser(id: number, data: User) {
    const token = this.auth.getToken();
	if(id > 0 ){
		return this.http.put<UserChangeResponse>(this.apiUrl + '/users/' + id, data, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} else {
		return this.http.post<UserChangeResponse>(this.apiUrl + '/users', data, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
  }

  changePassword(id: number, my_password: string, new_password: string, role = 'users' ) {
    const token = this.auth.getToken();
    return this.http.post<UserChangeResponse>(this.apiUrl + '/' + role +  '/change-password/' + id, {
      my_password: my_password,
      new_password: new_password
    }, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  logoutUser(id: number) {
    const token = this.auth.getToken();
    return this.http.post<UserChangeResponse>(this.apiUrl + '/users/logout-user/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  disableUser(id: number, role = 'users') {
    const token = this.auth.getToken();
    return this.http.post<UserChangeResponse>(this.apiUrl + '/'+ role +'/disable-user/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  enableUser(id: number, role = 'users') {
    const token = this.auth.getToken();
    return this.http.post<UserChangeResponse>(this.apiUrl + '/'+ role +'/enable-user/' + id, null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  } 
  
	isUsernameRegisterd(username: string, id: number = 0, role:string = 'user') {
        const token = this.auth.getToken();
        return this.http.post<any>(this.apiUrl + '/users/checkUsername', { username: username, id: id, role: role}, {
            });
    } 
	
	isEmailRegisterd(email: string, id: number = 0, role:string = 'user') {
        const token = this.auth.getToken();
        return this.http.post<any>(this.apiUrl + '/users/checkEmail', { email: email, id: id, role: role}, {
            });
    }  
	
	updateDocs(id:number,data:any) {		
        const token = this.auth.getToken();
        return this.http.post<any>(this.apiUrl + '/user/updatepagedocs',{'id':id,'files':data}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
	
	deleteFile(id:number,data:any) {		
        const token = this.auth.getToken();
        return this.http.post<any>(this.apiUrl + '/user/deletefile',{'id':id,'file':data}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }
	
	deleteUser(id: number, role = 'users') {
		const token = this.auth.getToken();
		return this.http.delete<UserChangeResponse>(this.apiUrl + '/'+ role +'/' + id, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	}
	
	userNotifications(id:number, role = 'user') {
		const token = this.auth.getToken();
		return this.http.get<any>(this.apiUrl + '/notification/user/'+id+'/'+role, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	  }
	  
	getTeachers(id:number,role:string = 'admin') {
		const token = this.auth.getToken();
		return this.http.post<User[]>(this.apiUrl + '/listing/teacher',{'id':id,'role':role}, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
	
	getTeacher(id) {
		const token = this.auth.getToken();
		return this.http.get<User>(this.apiUrl + '/users/' + id, {
			headers: {
			Authorization: 'Bearer ' + token
		  }
		}).map(res => {
		  return new User(res);
		});
	}
	
	getStudents(id:number,role:string = 'admin') {
		const token = this.auth.getToken();
		return this.http.post<User[]>(this.apiUrl + '/listing/student',{'id':id,'role':role}, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
		
	getParents(id:number,role:string = 'admin') {
		const token = this.auth.getToken();
		return this.http.post<User[]>(this.apiUrl + '/listing/parent',{'id':id,'role':role}, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
	
	createLink(id: number, student_id: number) {
		const token = this.auth.getToken();		
		return this.http.post<any>(this.apiUrl + '/create_link', { teacher_id:id, student_id:student_id}, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	
	 }
	 
	 
	searchStudentSuggestion(id:number,query:string = 'a'){
		const token = this.auth.getToken();
		return this.http.get<any>(this.apiUrl + '/student/suggestion/'+id+'/'+query ,{
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} 	
	
	subjectSuggestion(id:number,query:string = 'a'){
		const token = this.auth.getToken();
		return this.http.get<any>(this.apiUrl + '/subject/suggestion/'+id+'/'+query ,{
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	} 
	
	getStudentSubjects(id:number) {
		const token = this.auth.getToken();
		return this.http.get<any[]>(this.apiUrl + '/student-subjects/'+id, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}
	
	addNewSubject(student_id: number, subject_id: number, assigned_by:number = 0) {
		const token = this.auth.getToken();		
		return this.http.post<any>(this.apiUrl + '/student/assign_subject', { subject_id:subject_id, student_id:student_id, assigned_by: assigned_by}, {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});	
	}
	
	removeStudentSubject(id: number) {
		const token = this.auth.getToken();
		return this.http.get<any>(this.apiUrl + '/student/delete_subject/' + id, {
		  headers: {
			Authorization: 'Bearer ' + token
		  }
		});
	}

}