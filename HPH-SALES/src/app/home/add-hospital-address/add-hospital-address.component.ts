import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/_models/hospital';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HospitalService } from '../hospital.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hospital-address',
  templateUrl: './add-hospital-address.component.html',
  styleUrls: ['./add-hospital-address.component.css']
})
export class AddHospitalAddressComponent implements OnInit {
  submitted = false;
  hospitalForm: FormGroup;
  profileId = 6;
  hospitalmodel: Hospital;
  hospitalId: any;

  constructor(private router: Router, private hospitalservice: HospitalService,
    private toastr:ToastrService,
    private formBuilder: FormBuilder) 
    {
    this.hospitalmodel = new Hospital();
  }
  ngOnInit() {
    this.hospitalId = sessionStorage.getItem('hospitalId');
    this.hospitalForm = this.formBuilder.group({


      hospitalName:['',Validators.required],
      street: ['',Validators.required],
      district: ['',Validators.required],
      
      state: ['',Validators.required],
      country: ['',Validators.required],
      location: ['',Validators.required],
      pincode: ['',Validators.required],
     
     
      
      });
  }
  get f() { return this.hospitalForm.controls; }
  next(){
    this.submitted = true; 

    if (this.hospitalForm.invalid) {
      return;
    }
    else if (this.hospitalForm.valid){
    let req ={
      "profileId":this.profileId,
      "userId":this.hospitalId,
      "house":this.hospitalmodel.hospitalName,
      "street":this.hospitalmodel.street,
      "city":this.hospitalmodel.district,
      "location":this.hospitalmodel.location,
      "state": this.hospitalmodel.state,
      "country": this.hospitalmodel.country,
      "pin":this.hospitalmodel.pincode
    }

    console.log(req)
    this.hospitalservice.addAddress(req).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
    }
    // this.router.navigate(['/add-estId']);
  }
  handlerSucess(data){
  this.toastr.success('Location details added successfully');
  this.router.navigate(['/add-estId']);
  }
  handlerError(error){
  // this.toaster.error('missing data');
  }
}
