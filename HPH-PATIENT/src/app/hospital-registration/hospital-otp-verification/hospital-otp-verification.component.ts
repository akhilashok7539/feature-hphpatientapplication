import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/home/profile/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hospital-otp-verification',
  templateUrl: './hospital-otp-verification.component.html',
  styleUrls: ['./hospital-otp-verification.component.css']
})
export class HospitalOtpVerificationComponent implements OnInit {
  // status =false;
  registrationForm:FormGroup;
  otp:any;
  phone: any;

  constructor( private formBuilder: FormBuilder,
  private toaster:ToastrService,private userservice:UserService) 
  { 
    
  }

  ngOnInit() {
    // this.status = true;
    this.registrationForm = this.formBuilder.group({
      otp: ['', Validators.required],
     
    });
  }

  verify(){
    if(this.otp == null || this.otp == '')
    {
      this.toaster.error('Please enter the OTP');
      return;
    }
    let req ={
      "otp":this.otp
    }
    this.userservice.verifyOTP(req).subscribe(
      data => this.Success(data),
      error => this.catchError(error)
    );
  }
  Success(data){
  
   const status = true;

    this.toaster.success('Mobile number verified');
    // this.router.navigate(['/emailId']);
  }
  catchError(error){
    
    this.toaster.error('Incorrect OTP');
    
  }
  resend(){
    this.phone = JSON.parse(sessionStorage.getItem('mobNo'));
    let req ={
      "username":this.phone.username
    }
    this.userservice.sendOtp(req).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
  handlerSucess(data){
    this.toaster.success('OTP sent to your registered mobile number');
  }
  handlerError(error){
    this.toaster.error('Unable to sent OTP');
  }
  
}
