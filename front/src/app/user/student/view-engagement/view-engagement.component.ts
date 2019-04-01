import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
  selector: 'app-view-engagement',
  templateUrl: './view-engagement.component.html',
  styleUrls: ['./view-engagement.component.css']
})
export class ViewEngagementComponent implements OnInit {
	id: number;
	user: User = {} as User;
	data: any = [];
	selected: any;
	subjects: any = [];
	loader: boolean = false;
	pageLoader: boolean = true;
	
	constructor(aroute: ActivatedRoute, private router: Router,  private userService: UserService) {
		aroute.params.subscribe(params => {
				this.id = params['id'];
			});
	}

	ngOnInit() {
		this.loadStudentSubjects();
	}
	
	loadStudentSubjects(){
		
		this.userService.getStudentSubjectList(this.id).subscribe(res => {
		  this.user = res.user;
		  this.subjects = res.subjects;
		  this.pageLoader = false;
		});
	}
	
	onChangeSubject(event){		
		if(this.selected.id != ""){
			this.loader = true;
			this.userService.getSubjectSessions(this.id, this.selected.id).subscribe(res => {				
				this.formatSessionData(res);
			});
		} else{
			this.data = [];
		}
	}
	
	formatSessionData(sessionData){
		this.data = [];
		for(let i=0; i<sessionData.length; i++){
			
			let set = {label:'',data:[],fill:false,borderColor:'#4bc0c0'};
			set.label = "Page URL :- " + sessionData[i].page_url;
			set.data = JSON.parse(sessionData[i].data);
			
			let item = {labels:[],datasets:[]};
			item.labels = new Array(set.data.length).fill('');
			item.datasets.push(set);
			
			this.data.push({chart:item,timestamp:sessionData[i].created_at});
		}
		console.log(this.data);
		this.loader = false;
	}

}
