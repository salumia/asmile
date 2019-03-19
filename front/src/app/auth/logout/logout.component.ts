import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TemplateConfigService } from '../../template/template-config.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
	@Output() onFilter: any = new EventEmitter();
  constructor(private auth: AuthService, private router: Router, private templateService: TemplateConfigService) { }

  ngOnInit() {
    this.auth.logout().subscribe((res) => {
	  this.templateService.filter('header refresh');
      this.router.navigateByUrl('/login');
    });
  }

}
