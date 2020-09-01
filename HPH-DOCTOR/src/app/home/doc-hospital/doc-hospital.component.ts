import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-hospital',
  templateUrl: './doc-hospital.component.html',
  styleUrls: ['./doc-hospital.component.css']
})
export class DocHospitalComponent implements OnInit {
  doctordetails = [];
  docHospitalarray = [];
  privatepractice = [];
  currentProfileStatus: any;
  constructor() { }

  ngOnInit() {
    this.doctordetails = JSON.parse(localStorage.getItem('currentdoctor'));
    // for(let i =1;i<this.doctordetails.length;i++)
    // {
    //   this.docHospitalarray.push(this.doctordetails[i])
    // }
    // console.log(this.docHospitalarray)
    // this.privatepractice = this.doctordetails['0'];
  }
  getchange(c){
    console.log(c)
    
    localStorage.setItem('currentuserId',c.doctorId);
    localStorage.setItem('currentstatus',c.status);
    this.currentProfileStatus = localStorage.getItem('currentstatus');
  }
}
