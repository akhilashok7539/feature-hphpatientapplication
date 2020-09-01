import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/_models/hospital';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/home/profile/user.service';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/home/bookanappointment/search.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hospital-email-id-verification',
  templateUrl: './hospital-email-id-verification.component.html',
  styleUrls: ['./hospital-email-id-verification.component.css']
})
export class HospitalEmailIdVerificationComponent implements OnInit {
  public model: Hospital;
  registrationForm: FormGroup;
  otp: any;
  hospitalDetails: any;
  email: any;
  phone: any;
  error: any;
  EmailId: any;
  constructor(private userService: UserService, private toaster: ToastrService,
    private router: Router, private searchservice: SearchService, private formBuilder: FormBuilder) {
    this.model = new Hospital();

  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      otp: ['', Validators.required],

    });
  }
  verify() {
    if (this.otp == null || this.otp == '') {
      this.toaster.error('Please enter the OTP');
      return;
    }
    else {
      let req = {
        "otp": this.otp
      }
      this.userService.veriyemailOTP(req).subscribe(
        data => this.handlerSucess(data),
        error => this.handlerError(error)
      )
    }
  }
  handlerSucess(data) {
    this.completeProfile();
  }
  handlerError(error) {
    this.toaster.error('Incorrect OTP');

  }
  completeProfile(){
    this.hospitalDetails = JSON.parse(sessionStorage.getItem('hospitalDetails'));
    console.log(this.hospitalDetails)
    this.email = JSON.parse(sessionStorage.getItem('email'));
    console.log(this.email)
    this.phone = JSON.parse(sessionStorage.getItem('mobNo'));
    console.log(this.phone)
    let req ={
      "profileId": this.hospitalDetails.profileId,
      "cityId": this.hospitalDetails.cityId,
      "hospitalName": this.hospitalDetails.hospitalName,
      "phone": this.phone.username,
      "email": this.email.username,
      "contactName": this.hospitalDetails.contactName,
      "contactPhone": this.hospitalDetails.contactPhone,
      "contactEmail":this.hospitalDetails.contactEmail,
      "hospitalType": this.hospitalDetails.hospitalType,
      "isRegisteredByAdmin":this.hospitalDetails.isRegisteredByAdmin
  }
  console.log(req)
  this.userService.createNewHospital(req).subscribe(
    data => this.handlerSucesss(data),
    error => this.handlerErrors(error)
  )
  }
  handlerSucesss(data){
    this.toaster.success('Hospital registered successfully and your credentials are mail to your registered mail ID');
    this.router.navigate(['/Home']);
  }
  handlerErrors(error){
    this.error = error.error['error'];
    this.toaster.error(this.error);
  }
  resendOTP(){
    this.EmailId = JSON.parse(sessionStorage.getItem('email'));
    console.log(this.EmailId)
    let req ={
      "username":this.EmailId
    }
    this.userService.verifyEmail(req).subscribe(
      data => this.handlersucess(data),
      error => this.handlererror(error)
    )
  }
  handlersucess(data){
    this.toaster.success('OTP sent successfully');
    // this.router.navigate(['/verifyEmailOtp']);
  }
  handlererror(error){
    this.toaster.error('Unable to sent OTP');
  }
}
