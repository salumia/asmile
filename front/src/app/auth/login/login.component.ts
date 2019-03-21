import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { Auth } from '../auth';
import { AuthData } from '../auth-response';
import { Message } from 'primeng/components/common/api';
import { HttpErrorResponse } from '@angular/common/http';
import { TemplateConfigService } from '../../template/template-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username:string;
  public password:string;
  public msgs: Message[];
  processing: boolean = false;
  @Output() onFilter: any = new EventEmitter();
  constructor(private auth: AuthService, private router: Router, private templateService: TemplateConfigService) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
		this.templateService.filter('header refresh');
		this.router.navigate(['dashboard']);
	}
  }

  doAuth() {
	  this.processing = true;
    let auth: Auth = new Auth(this.username, this.password);

    this.auth.login(auth).subscribe(res => {
		this.processing = false;
      console.log(res);
      if(res instanceof HttpErrorResponse) {
        this.updateMessage('Login Failed:', res.error.message);
        this.clearForm();
      } else if(res instanceof AuthData) {
		this.templateService.filter('header refresh');
        this.router.navigateByUrl('/dashboard');
		location.reload();		
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
