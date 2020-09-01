import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/_models/hospital';
import { UserService } from 'src/app/home/profile/user.service';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from 'src/app/home/bookanappointment/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospital-mobilenumber',
  templateUrl: './hospital-mobilenumber.component.html',
  styleUrls: ['./hospital-mobilenumber.component.css']
})
export class HospitalMobilenumberComponent implements OnInit {
  registrationForm:FormGroup;
  public model:Hospital;
  registeredby:boolean = false;
  profileId = 6;
  city: any;
  submitted = false;
  constructor(private userService:UserService ,private toaster:ToastrService,
    private router:Router,private searchservice:SearchService ,private formBuilder: FormBuilder) {
    this.model=new Hospital();
   }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
   
      mobNo: ['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],


    });
  }
  get f() { return this.registrationForm.controls; }
  sendOtp(){
    this.submitted = true; 
    if (this.registrationForm.invalid) {
      console.log('form invalid')
      return;
    }
    else if(this.registrationForm.valid)
    {
      let req ={
        "username":this.model.mobNo
      }
      sessionStorage.setItem('mobNo',JSON.stringify(req));
      this.userService.sendOtp(req).subscribe(
        data => this.handlerSucess(data),
        error => this.handlerError(error)
      )
    }
  }
  handlerSucess(data){
    this.toaster.success('OTP send to your registered mobile number');
    this.router.navigate(['/HospitalOtpVerification']);
  }
  handlerError(error){
  this.toaster.error('failed to send otp');
  }
}
