import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/_models/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/department/department.service';
import { HospitalService } from '../hospital.service';
import { error } from 'protractor';
import { DatasharingService } from '../_shared/datasharing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hospital-address',
  templateUrl: './add-hospital-address.component.html',
  styleUrls: ['./add-hospital-address.component.css']
})
export class AddHospitalAddressComponent implements OnInit {
  citys:any;
  loading: boolean;
  submitted = false;
  // hospitalId=1;
  profileId=6;
  speciality = [];
  city =[];
  doctorDetails =[];
  uId:any;
  public doctor:Doctor;
  doctorId:any;
  hospitalForm :FormGroup;
  public doctormodel:Doctor;
  hospitalId: any;
  constructor(private router:Router,
    private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,private dataservice:DatasharingService,
    private toaster:ToastrService,
    private _router: Router,private hospitalservice:HospitalService) {
    this.doctormodel =new Doctor();
   }

  ngOnInit() {

    this.dataservice.currentUserId.subscribe(userId =>this.hospitalId = userId);
    console.log(this.hospitalId)
    
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
      "house":this.doctormodel.hospitalName,
      "street":this.doctormodel.street,
      "city":this.doctormodel.district,
      "location":this.doctormodel.location,
      "state": this.doctormodel.state,
      "country": this.doctormodel.country,
      "pin":this.doctormodel.pincode
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
  this.toaster.success('Location details added successfully');
  this.router.navigate(['/add-estId']);
  }
  handlerError(error){
  this.toaster.error('missing data');
  }
}
