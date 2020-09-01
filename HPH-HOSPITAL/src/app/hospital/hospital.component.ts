import { Component, OnInit } from '@angular/core';
import { Doctor } from '../_model/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from './hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  values = 0;
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
// hospital change
  i:any;

  doctorId:any;
  hospitalForm :FormGroup;
  public doctormodel:Doctor;
  error: any;
  constructor(private router:Router ,
    private formBuilder: FormBuilder,private hospitalservice:HospitalService,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService) {
    this.doctormodel =new Doctor();
   }

  ngOnInit() {
    let userId = localStorage.getItem("currentuserId");
    this.hospitalservice.getCity().subscribe(
      data =>{
      this.citys =data; 
      console.log(this.citys)
    
    })
    this.hospitalForm = this.formBuilder.group({


      hospitalName:['',Validators.required],
      phone: ['',Validators.required],
      contactName: ['',Validators.required],
      contactPhone: ['',Validators.required],
      contactEmail: ['',Validators.required],
      email: ['',Validators.required],
      cityId: ['',Validators.required],
      hospitalType: ['',Validators.required],
     
      
      });
      this.viewprofile(+userId);
  }


  nextClicked(){
    console.log(this.values)
    this.values = this.values+1;
  }
  nextclickestablishment(){
    console.log(this.values)
    this.values = this.values+1;
  }
  isSelected(index: number) {
    if (this.values == index) {
        return false;
    } else {
        return true;
    }
}
get f() { return this.hospitalForm.controls; }
viewprofile(userId){
  this.hospitalservice.getHospitalById(userId).subscribe(
    data =>this.handleSuccess(data)
  )
}
handleSuccess(data){
  this.doctormodel =data;
 this.doctormodel.hospitalName = this.doctormodel['hospitalName'];
 this.doctormodel.email = this.doctormodel['email'];
 this.doctormodel.phone = this.doctormodel['phone'];
 this.doctormodel.contactName = this.doctormodel['contactName'];
 this.doctormodel.contactEmail = this.doctormodel['contactEmail'];
 this.doctormodel.contactPhone = this.doctormodel['contactPhone'];
 this.doctormodel.cityId = this.doctormodel.city['cityId'];
 this.doctormodel.hospitalType = this.doctormodel['hospitalType'];
}
Next(){
  this.submitted = true; 

  if (this.hospitalForm.invalid) {
    return;
  }
  else if (this.hospitalForm.valid){
  let userId = localStorage.getItem("currentuserId");

  let req = {
    "profileId": this.profileId,
    "cityId": this.doctormodel.cityId,
    "hospitalName": this.doctormodel.hospitalName,
    "phone": this.doctormodel.phone,
    "email": this.doctormodel.email,
    "contactName": this.doctormodel.contactName,
    "contactPhone": this.doctormodel.contactPhone,
    "contactEmail":this.doctormodel.contactEmail,
    "hospitalType": this.doctormodel.hospitalType
  }
  console.log(req)
  this.hospitalservice.updateDoctor(req,userId).subscribe(
    data => this.dataSucess(data),
    error => this.dataError(error)
  )
  }
// this.router.navigate(['/editAddress']);
}
dataSucess(data){
  this.toaster.success('Basic details added successfully');
  this.values = this.values +1;
  // this.router.navigate(['/hospitalAddress']);
}
dataError(error){
  this.toaster.error('Cannot added basic details');
}
 
}
