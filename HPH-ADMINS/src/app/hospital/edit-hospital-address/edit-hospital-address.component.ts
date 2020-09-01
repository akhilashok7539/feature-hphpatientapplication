import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/_models/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/department/department.service';
import { DatasharingService } from '../_shared/datasharing.service';
import { HospitalService } from '../hospital.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-hospital-address',
  templateUrl: './edit-hospital-address.component.html',
  styleUrls: ['./edit-hospital-address.component.css']
})
export class EditHospitalAddressComponent implements OnInit {
  citys:any;
  loading: boolean;
  // hospitalId=1;
  profileId=6;
  speciality = [];
  city =[];
  submitted = false;
  doctorDetails =[];
  uId:any;
  public doctor:Doctor;
  doctorId:any;
  hospitalForm :FormGroup;
  public doctormodel:Doctor;
  constructor(private router:Router,private departService:DepartmentService,
    private formBuilder: FormBuilder,private datasharing:DatasharingService,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private _router: Router,private hospitalservice:HospitalService) {
    this.doctormodel =new Doctor();
   }

  ngOnInit() {
    let userId = sessionStorage.getItem("hospitalId");
    console.log(userId)
    
    this.hospitalForm = this.formBuilder.group({


      hospitalName:['',Validators.required],
      street: ['',Validators.required],
      district: ['',Validators.required],
      
      state: ['',Validators.required],
      country: ['',Validators.required],
      location: ['',Validators.required],
      pincode: ['',Validators.required],
     
     
      
      });
      this.ViewProfileAdress(+userId);
  }

  ViewProfileAdress(userId){
    let req ={
      "profileId":this.profileId,
      "userId":userId
      
    }
    console.log(req)
    this.hospitalservice.viewAddress(this.profileId,userId,req).subscribe(
      data =>this.handlerAddressSucess(data)
      );
  }


  handlerAddressSucess(data){
    console.log(data)
    this.doctormodel =data;
    this.doctormodel.hospitalName = this.doctormodel['house'];
    this.doctormodel.street = this.doctormodel['street'];
    this.doctormodel.district = this.doctormodel['city'];
    this.doctormodel.location = this.doctormodel['location'];
    this.doctormodel.state = this.doctormodel['state'];
    this.doctormodel.country =  this.doctormodel['country'];
    this.doctormodel.pincode = this.doctormodel['pin'];

  }
  get f() { return this.hospitalForm.controls; }
next(){
  this.submitted = true; 

  if (this.hospitalForm.invalid) {
    return;
  }
  else if (this.hospitalForm.valid){
  let userId = sessionStorage.getItem("hospitalId");
  console.log(userId)
  
  let req ={
    "profileId":this.profileId,
    "userId":userId,
    "house":this.doctormodel.hospitalName,
    "street":this.doctormodel.street,
    "city":this.doctormodel.district,
    "location":this.doctormodel.location,
    "state": this.doctormodel.state,
    "country": this.doctormodel.country,
    "pin":this.doctormodel.pincode
  }
  this.hospitalservice.addAddress(req).subscribe(
    data => this.handlerSucess(data),
    error => this.handlerError(error)
  )
  }
  // this.router.navigate(['/add-estId']);
}
handlerSucess(data){
  console.log('sucess')
  this.toaster.success('Location details added sucessfully');
  this.router.navigate(['/edit-estid']);
}
handlerError(error) 
{
  this.toaster.error('Unable to update hospital address');
  console.log(error)
}
}


