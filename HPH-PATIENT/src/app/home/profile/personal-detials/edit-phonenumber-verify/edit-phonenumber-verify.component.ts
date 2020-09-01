import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/login/login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-edit-phonenumber-verify',
  templateUrl: './edit-phonenumber-verify.component.html',
  styleUrls: ['./edit-phonenumber-verify.component.css']
})
export class EditPhonenumberVerifyComponent implements OnInit {
  OTPForm:FormGroup;
  loading: boolean;
  profileId = 1;
  mobNo: any;
  public loginmodel: Login;
  error: any;
  patientId: any;
  constructor(private formBuilder: FormBuilder,
    private _router: Router, private toastr: ToastrService,
    private loginService: LoginService) {
    this.loginmodel = new Login();
  }
  ngOnInit() {
    this.OTPForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }
  verify() {

    let req = {
      "otp": this.loginmodel.otp
    }
    console.log(req)
    this.loginService.verifyOtp(req).subscribe(
      data => this.Success(data),
      error => this.catchError(error)
    );
  }
  Success(data) {
    this.toastr.success('OTP verified successfully');
    // this._router.navigate(['/profile']);
    this.MobilenumberChnaged();
  }
  catchError(error) {
    // this.toastr.error('Please enter the OTP');
    this.error = error.error['response'];
    console.log(error)
    //console.log(error)
    this.toastr.error(this.error);
    // this._router.navigate(['/Profileview']);
  }
  MobilenumberChnaged() {
   
    this.patientId =  localStorage.getItem('currentPatientid');
    this.mobNo = JSON.parse(sessionStorage.getItem('changedNumber')) ;
    let req = {
      "mobNo": this.mobNo,
      "profileId": this.profileId
    }
    console.log(req)
    this.loginService.numberChanged(req, this.patientId).subscribe(
      data => this.handleSuccess2(data),
      error => this.errorhandle(error)
    )
  }
  handleSuccess2(data) {
    // const uId:any = data.patientId;
    // localStorage.setItem('currentPatient',JSON.stringify(data));
    // localStorage.setItem('currentPatientid',uId);
    // console.log(localStorage)
    this._router.navigate(['/profile']);
  }
  errorhandle(error) {
    console.log(error)
  }
  sendOtp(){
    this.mobNo = JSON.parse(sessionStorage.getItem('changedNumber')) ;

    let req = {
      "username": this.mobNo,
      "profileId": this.profileId
    }
    this.loginService.sendOTP(req).subscribe(
      data => this.handleSuccess1(data),
      error => this.catchError1(error)
    );
  }
  handleSuccess1(data) {
    this.toastr.success('OTP sent to your mobile number');
  }
  catchError1(error) {
    this.error = error.error['error'];
    this.toastr.error(this.error);
  }
  
}
