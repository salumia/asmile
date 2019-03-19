import { Injectable, Inject } from '@angular/core';
import { Auth, ResetEmail } from "./auth";
import { AuthResponse, AuthData }  from './auth-response';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";
import { Router } from "@angular/router";
import { ConfigServiceService } from "../config-service.service";

@Injectable()
export class AuthService {

  private apiUrl;
  private adminApiUrl;

  constructor(private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, config: ConfigServiceService) {
    this.apiUrl = config.getApiUrl();
    this.adminApiUrl = 'http://localhost:8000/admin/';
  }
  
  loginAdmin(user: Auth): Observable<AuthData> {
    return new Observable((observer) => {
      this.doLoginAdmin(user).subscribe((response: AuthResponse) => {
        let user: AuthData = new AuthData(response.data);
        this.storage.set('app.auth', user);
        observer.next(<AuthData> user);
        observer.complete();
      }, (error: any) => {
        observer.next(error);
        observer.complete();
      });
    });
  }
  

  reset(user): Observable<AuthData> {
    return new Observable((observer) => {
      this.doReset(user).subscribe((response) => {
        let user = response.data;
        observer.next(user);
        observer.complete();
      }, (error: any) => {
        observer.next(error);
        observer.complete();
      });
    });
  }
  
  login(user: Auth): Observable<AuthData> {
    return new Observable((observer) => {
      this.doLogin(user).subscribe((response: AuthResponse) => {
        let user: AuthData = new AuthData(response.data);
        this.storage.set('app.auth', user);
        observer.next(<AuthData> user);
        observer.complete();
      }, (error: any) => {
        observer.next(error);
        observer.complete();
      });
    });
  }

  logout(): Observable<AuthData> {
    return new Observable((observer) => {
      this.doLogout().subscribe((response: AuthResponse) => {
        this.storage.remove('app.auth');
        observer.next(response.data);
        observer.complete();
      });
    });
  }

  getAuth() {
    return (this.storage.get('app.auth')) ? this.storage.get('app.auth') : null;
  }

  getToken() {
    return (this.storage.get('app.auth')) ? this.storage.get('app.auth').api_token : null;
  }

  isLoggedIn() {
    return this.getAuth() != null;
  }

  checkLogin() {
    let token = (this.storage.get('app.auth')) ? this.storage.get('app.auth').api_token : null;

    // Test token
    if(token) {
      this.http.get<AuthData>(this.apiUrl + '/user', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).subscribe((res: AuthData) => {
        let user:AuthData = new AuthData(res);
        if(user.id == null ) {
          this.storage.remove('app.auth');
          this.router.navigate(['login']);
        }

        // Otherwise, login is OK
      }, err => {
        this.storage.remove('app.auth');
        this.router.navigate(['login']);
      });
    } else {
      this.storage.remove('app.auth');
      this.router.navigate(['login']);
    }
  }

  checkPermissions(role: string) {
    return true;
  }

  private doReset(user: Auth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + '/reset-password', {'email': user});
  }
  
  private doLogin(user: Auth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + '/login', user);
  }
  
  private doLoginAdmin(user: Auth): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + '/login-admin', user);
  }
  
  private doLogout(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl + '/logout', null);
  }

}
