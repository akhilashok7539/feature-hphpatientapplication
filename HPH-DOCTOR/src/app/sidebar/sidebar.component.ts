import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  show:any;
  depatmentHead: any;
  constructor() { }

  ngOnInit() {
    let currentstatus = localStorage.getItem('currentstatus');
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
    const doctordetails = JSON.parse(localStorage.getItem('currentselectedDoctor'))
    this.depatmentHead = doctordetails['0'].departmentHead;
    console.log(this.depatmentHead)
  }

}
