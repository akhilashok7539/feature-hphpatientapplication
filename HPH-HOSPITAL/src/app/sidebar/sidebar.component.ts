import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  show:any;
  hospitalStautsUser:any;
  constructor() { }

  ngOnInit() {
    let currentstatus = localStorage.getItem('currentstatus');
    this.hospitalStautsUser = localStorage.getItem('currenthospitalUserStatus');
    if(this.hospitalStautsUser == 'HOSPITAL_USER')
    {
      this.hospitalStautsUser = 'HOSPITAL_USER';
    }
    else{
      this.hospitalStautsUser = 'HOSPITAL';
      
    }
    console.log(currentstatus)
    if(currentstatus == 'UNAPPROVED'){
      this.show =  'UNAPPROVED';
    }
    else if(currentstatus == 'PENDING'){
      this.show = 'PENDING';
    }
    else if(currentstatus == 'ACTIVE'){
      this.show = 'ACTIVE';
    }
  }
  

}
