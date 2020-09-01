import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-doctors-list',
  templateUrl: './pending-doctors-list.component.html',
  styleUrls: ['./pending-doctors-list.component.css']
})
export class PendingDoctorsListComponent implements OnInit {
  salesId: any;
  salesDetails: any;
  results: any;
  pages:any =[];
  page:number=0;
  doctorsList: any = [];
  constructor(private hospitalservice:HospitalService,private router:Router) { }

  ngOnInit() {
    this.salesDetails = JSON.parse(localStorage.getItem('sales'));
    this.salesId = this.salesDetails.salesId;
    console.log(this.salesId)
    this.getallDoctors();
  }
  getallDoctors(){
    // this.page = 0;
    this.hospitalservice.getAlldoctorsAddedbysalesPending(this.salesId,this.page).subscribe(
      data =>{
        this.doctorsList = data['content'];
        this.pages =  new Array(data['totalPages']);

      },
      error =>{
        console.log(error);
        this.pages =null;
      }
    )
  }
  getdoctorpages(i,event:any){
    console.log('pagination active')
    event.preventDefault();
    this.page = i;
    this.getallDoctors();
  }
  viewdoc(doctorsList){
    console.log(doctorsList.doctorId);
    
    this.router.navigate(['/doctorview',doctorsList.doctorId]);
  }
}
