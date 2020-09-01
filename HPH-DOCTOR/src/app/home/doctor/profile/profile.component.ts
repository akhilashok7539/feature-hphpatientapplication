import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Doctorfirstname:any;
  Doctorlastname:any;
  doctorDetails =[];
  DoctorId:string;
  hospital = '';
  hospitalselected;
  dochospitaldetail =[];
  ischanged = false;
  constructor() { }

  ngOnInit() {
    this.dochospitaldetail = JSON.parse(localStorage.getItem('currentdoctor'));
    this.doctorDetails =JSON.parse(localStorage.getItem('currentselectedDoctor'));
    this.DoctorId = JSON.parse(localStorage.getItem('currentuserId'));

    this.Doctorfirstname = this.dochospitaldetail['0'].firstName;
    this.Doctorlastname = this.dochospitaldetail['0'].lastName;
  
   
    this.hospitalselected = this.doctorDetails['0'];
    console.log(this.hospital)
    }
    change(){
    this.ischanged = true;

    }
    save(){
      this.ischanged = false;
    }
  }
