import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../login/login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-loginotp',
  templateUrl: './loginotp.component.html',
  styleUrls: ['./loginotp.component.css']
})
export class LoginotpComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  profileId = 1;
  public loginmodel: Login;
  error: any;
  mobilenumber: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private toastr: ToastrService,
    private loginService: LoginService) {
    this.loginmodel = new Login();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobNo: ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],

      // password: ['', Validators.required]
    });
  }
  sendOtp() {

    let req = {
      "username": this.loginmodel.mobNo,
      "profileId": this.profileId
    }
    console.log(req)
    this.loginService.sendOtpLogin(req).subscribe(
      data => this.handleSuccess(data),
      error => this.catchError(error)
    );

  }
  handleSuccess(data) {
    console.log(data)
    this.mobilenumber = this.loginmodel.mobNo;
    sessionStorage.setItem('loginOTP',this.mobilenumber);
    this.toastr.success('OTP sent to your mobile number');
    this.router.navigate(['/otpverification']);

  }
  catchError(error) {

    //console.log(error)

    this.error = error.error['error'];
    if (this.error == 'Missing Data') {
      this.toastr.error('Please Fill the details');
    }
    else {
      this.toastr.error(this.error);
    }

  }

}
