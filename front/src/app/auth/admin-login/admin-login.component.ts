import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { Auth } from '../auth';
import { AuthData } from '../auth-response';
import { Message } from 'primeng/components/common/api';
import { HttpErrorResponse } from '@angular/common/http';
import { TemplateConfigService } from '../../template/template-config.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  public username: string;
  public password: string;
  public msgs: Message[];
  @Output() onFilter: any = new EventEmitter();
  constructor(private auth: AuthService, private router: Router, private templateService: TemplateConfigService) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
		this.templateService.filter('header refresh');
		this.router.navigate(['dashboard']);
	}
  }

  doAuth() {
    let auth: Auth = new Auth(this.username, this.password);

    this.auth.loginAdmin(auth).subscribe(res => {
      if(res instanceof HttpErrorResponse) {
        this.updateMessage('Login Failed:', res.error.message);
        this.clearForm();
      } else if(res instanceof AuthData) {
		this.templateService.filter('header refresh');
        this.router.navigateByUrl('/dashboard');
		location.reload();
		//window.location.href = "http://trigvent.com/portfolio/clerk/";		
      } else {
        this.updateMessage('Login Failed:', 'An unknown error occurred');
        this.clearForm();
      }
    });
  }

  private updateMessage(summary:string, detail:string) {
    this.msgs = [];
    this.msgs.push({
      severity: 'error',
      summary: summary,
      detail: detail
    });
  }

  private clearForm() {
    this.password = '';
  }

}
