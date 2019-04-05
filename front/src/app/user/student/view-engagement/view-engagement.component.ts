import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Location} from '@angular/common';

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
	sessions: any = [];
	loader: boolean = false;
	pageLoader: boolean = true;
	reportDialogVisible: boolean = false;
	reportData: any = { chart:[],start_timestamp:'', timestamp:''};
	
	constructor(aroute: ActivatedRoute, private router: Router,  private userService: UserService, private _location: Location) {
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
				this.sessions = res;
				this.formatSessionData(res);
			});
		} else{
			this.data = [];
		}
	}
	
	formatSessionData(sessionData){
		this.data = [];
		
		sessionData.forEach((row : any, index :any) => {
			let set = {label:'',data:[],fill:false,borderColor:'#4bc0c0'};
			set.label = "Page URL :- " + row[0].page_url;
			set.data = JSON.parse(row[0].data);
			
			let item = {labels:[],datasets:[]};
			item.labels = new Array(set.data.length).fill('');
			item.datasets.push(set);
			
			this.data.push({chart:item,timestamp:row[0].created_at,total_sessions:row.length, current_session:0});
		})
		this.loader = false;
	}
	
	goBack() {
        this._location.back();
    }
	
	paginateSession(event, index){
		console.log(this.sessions[index][event.page]);
	
		let set = {label:'',data:[],fill:false,borderColor:'#4bc0c0'};
		set.label = "Page URL :- " + this.sessions[index][event.page].page_url;
		set.data = JSON.parse(this.sessions[index][event.page].data);

		let item = {labels:[],datasets:[]};
		item.labels = new Array(set.data.length).fill('');
		item.datasets.push(set);

		this.data[index] = {chart:item,timestamp:this.sessions[index][event.page].created_at,total_sessions:this.sessions[index].length, current_session:event.page}
		console.log(this.data);
	}
	
	viewReport(session){	
		this.reportData.chart = [];
		this.reportData.start_timestamp = '';
		
		let timeSpan = session.chart.datasets[0].data.length * 3;
		var dt = new Date(session.timestamp);
        dt.setSeconds( dt.getSeconds() - timeSpan );
		this.reportData.start_timestamp = dt;
		session.chart.datasets[0].data.forEach((row : any, index :any) => {			
			var t = new Date(this.reportData.start_timestamp);
			t.setSeconds( t.getSeconds() + 3 );	
			this.reportData.start_timestamp	 = t;
			this.reportData.chart.push({engagement:row,timestamp:t});
		});
		
		this.reportDialogVisible = true;
		console.log(this.reportData); 
	}

}
