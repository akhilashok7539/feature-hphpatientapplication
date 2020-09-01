import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/hospital/hospital.service';

@Component({
  selector: 'app-view-hospital',
  templateUrl: './view-hospital.component.html',
  styleUrls: ['./view-hospital.component.css']
})
export class ViewHospitalComponent implements OnInit {
  hospitlaDetails:any;
  name:any;
  mob:any;
  email:any;
  contactPhone: any;
  contactEmail: any;
  contactName: any;
  hospitalType: any;
  city: any;
  salesPerson: any;
  slesPersonLastname: any;
  constructor(private hospitalservice:HospitalService) { }

  ngOnInit() {
    let userId = sessionStorage.getItem("hospitalId");
    console.log(userId)
    this.hospitalservice.getHospitalById(userId).subscribe(
      data =>{
        this.handleSuccess(data)
      }
    )
  }
  handleSuccess(data){
    console.log(data)
    this.hospitlaDetails =data;
    this.name=this.hospitlaDetails['hospitalName'];
    this.mob=this.hospitlaDetails['phone'];

    this.email = this.hospitlaDetails['email'];
    this.contactPhone = this.hospitlaDetails['contactPhone'];
    this.contactEmail = this.hospitlaDetails['contactEmail'];  
    this.contactName = this.hospitlaDetails['contactName'];
    this.hospitalType = this.hospitlaDetails['hospitalType'];
    this.city = this.hospitlaDetails.city['cityName'];
    if(this.hospitlaDetails.sales != null)
    {
      this.salesPerson = this.hospitlaDetails.sales['firstName'];
      this.slesPersonLastname = this.hospitlaDetails.sales['lastName'];
    }
   

    console.log(this.name)
    
  }
  downloadOwnerIdProof(){
    let userId = sessionStorage.getItem("hospitalId");
    this.hospitalservice.downloadOwnerIdproof(userId);
    
  
  }
 
  downloadEstaIdProof(){
    let userId = sessionStorage.getItem("hospitalId");
    this.hospitalservice.downloadEstaIdProof(userId);
  }
}
