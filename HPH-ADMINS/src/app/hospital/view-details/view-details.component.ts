import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  hospitlaDetails: any;
  name: any;
  mob: any;
  email: any;
  contactPhone: any;
  contactEmail: any;
  contactName: any;
  hospitalType: any;
  city: any;
  profileStatus: any;
  percentages: any;
  adminPercentage: any;
  hospitalPercentage: any;
  patientPercentage: any;
  percentgageId: any;
  adminpercentagemessage: string;
  constructor(private hospitalservice: HospitalService, private router: Router) { }

  ngOnInit() {
    let userId = sessionStorage.getItem("hospitalId");
    console.log(userId)
    this.hospitalservice.getHospitalById(userId).subscribe(
      data => {
        this.handleSuccess(data)
      }
    )
    this.getperecntageByhospital();
  }
  handleSuccess(data) {
    console.log(data)
    this.hospitlaDetails = data;
    this.name = this.hospitlaDetails['hospitalName'];
    this.mob = this.hospitlaDetails['phone'];

    this.email = this.hospitlaDetails['email'];
    this.contactPhone = this.hospitlaDetails['contactPhone'];
    this.contactEmail = this.hospitlaDetails['contactEmail'];
    this.contactName = this.hospitlaDetails['contactName'];
    this.hospitalType = this.hospitlaDetails['hospitalType'];
    this.city = this.hospitlaDetails.city['cityName'];
    this.profileStatus = this.hospitlaDetails['profileStatus'];

    console.log(this.name)

  }

  downloadOwnerIdProof() {
    let userId = sessionStorage.getItem("hospitalId");
    this.hospitalservice.downloadOwnerIdproof(userId);


  }

  downloadEstaIdProof() {
    let userId = sessionStorage.getItem("hospitalId");
    this.hospitalservice.downloadEstaIdProof(userId);
  }
  getAllDoctors() {
    this.router.navigate(['/getalldoctors']);
  }
  editPercentage() {
    this.router.navigate(['/edit-percentage',this.percentgageId]);
  }
  getperecntageByhospital() {
    let userId = sessionStorage.getItem("hospitalId");
    this.hospitalservice.getpercentageByHospitalId(userId).subscribe(
      data =>{
        this.percentages = data;
        if(this.percentages == null)
        {
        console.log('null');
        this.adminpercentagemessage = 'no data found';
        
        }
        else{
        console.log('nullasda');
        this.adminpercentagemessage = 'data found';
        this.adminPercentage = this.percentages.adminPercentage;
        this.hospitalPercentage = this.percentages.hospitalPercentage;
        this.patientPercentage = this.percentages.patientPercentage;
        this.percentgageId=this.percentages.percentageId;
        }
       
       
        
      },
      error =>{
        this.adminpercentagemessage = 'no data found';
      }
    )
  }
  viewCC(){
    let hsopitalId =sessionStorage.getItem("hospitalId");
    this.router.navigate(['/viewallcc',hsopitalId]);
  }
  getappointments(){
    let hsopitalId =sessionStorage.getItem("hospitalId");
    this.router.navigate(['/appointments',hsopitalId]);
  }
}
