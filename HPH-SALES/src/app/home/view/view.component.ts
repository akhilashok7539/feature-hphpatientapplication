import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  hospitlaDetails:any;
  name:any;
  mob:any;
  email:any;
  contactPhone: any;
  contactEmail: any;
  contactName: any;
  hospitalType: any;
  city: any;
  hospitalId: any;

  constructor(private activateRouter:ActivatedRoute, private hospitalservice:HospitalService) { }

  ngOnInit() {
    this.activateRouter.params.subscribe(params => {
      console.log(params)
      this.hospitalId =params.hospitalId;
      // this.hospitalId = params.hospitalId
    })
    this.hospitalservice.getHospistalById(this.hospitalId).subscribe(
      data =>{
        this.hospitlaDetails =data;
        this.name=this.hospitlaDetails['hospitalName'];
    this.mob=this.hospitlaDetails['phone'];

    this.email = this.hospitlaDetails['email'];
    this.contactPhone = this.hospitlaDetails['contactPhone'];
    this.contactEmail = this.hospitlaDetails['contactEmail'];  
    this.contactName = this.hospitlaDetails['contactName'];
    this.hospitalType = this.hospitlaDetails['hospitalType'];
    this.city = this.hospitlaDetails.city['cityName'];
      },
      error =>{

      }
    )
  }
  downloadOwnerIdProof(){
    // let userId = sessionStorage.getItem("hospitalId");
    this.hospitalservice.downloadOwnerIdproof(this.hospitalId);
    
  
  }
 
  downloadEstaIdProof(){
    // let userId = sessionStorage.getItem("hospitalId");
    this.hospitalservice.downloadEstaIdProof(this.hospitalId);
  }


}
