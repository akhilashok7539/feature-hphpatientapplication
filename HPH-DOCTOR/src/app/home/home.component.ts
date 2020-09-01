import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  show:any;
  length:any;
  doctordetails = [];
  constructor(private router:Router) { }

  ngOnInit() {
    let currentstatus = localStorage.getItem('currentstatus');
    this.doctordetails = JSON.parse(localStorage.getItem('currentdoctor'));
    this.length = this.doctordetails.length;
    console.log(this.doctordetails.length)
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
  completeProfile(){
  this.router.navigate(['/doctorBasicDetails']);
  }
  choose()
  {
    this.router.navigate(['/hospitalselect']);
  }
}
