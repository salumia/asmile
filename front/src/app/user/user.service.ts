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
	  
	getTeachers() {
		const token = this.auth.getToken();
		return this.http.get<User[]>(this.apiUrl + '/listing/teacher', {
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
	
	getStudents() {
		const token = this.auth.getToken();
		return this.http.get<User[]>(this.apiUrl + '/listing/student', {
			headers: {
				Authorization: 'Bearer ' + token
			}
		});
	}

}