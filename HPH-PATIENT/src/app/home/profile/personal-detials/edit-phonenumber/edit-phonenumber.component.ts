import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/login/login';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-edit-phonenumber',
  templateUrl: './edit-phonenumber.component.html',
  styleUrls: ['./edit-phonenumber.component.css']
})
export class EditPhonenumberComponent implements OnInit {
  changePhonenumber:FormGroup;
  public loginmodel: Login;
  patientId: string;
  profileId = 1;
  error: any;
  MobileNumber: string;
  constructor(private formBuilder: FormBuilder,
    private _router: Router, private toastr: ToastrService,
    private loginService: LoginService) {
    this.loginmodel = new Login();
  }

  ngOnInit() {
    this.patientId =  localStorage.getItem('currentPatientid');
    this.changePhonenumber = this.formBuilder.group({
      mobNo: ['', Validators.required]
    });
  }
  sendOtp(){
    if(this.loginmodel.mobNo == null || this.loginmodel.mobNo =='')
    {
      this.toastr.error('Please enter your mobile number');
      return;
    }
    let req = {
      "username": this.loginmodel.mobNo,
      "profileId": this.profileId
    }
    console.log(req)
    this.loginService.sendOtp(req).subscribe(
      data => this.handleSuccess(data),
      error => this.catchError(error)
    );
  }
  handleSuccess(data) {
    console.log(data)
    this.MobileNumber = this.loginmodel.mobNo;
    sessionStorage.setItem('changedNumber',JSON.stringify(this.MobileNumber))
    this.toastr.success('OTP sent to your mobile number');
    this._router.navigate(['/verifyphone']);
  }
  catchError(error) {
    this.error = error.error['error'];
    //console.log(error)
    this.toastr.error(this.error);
    // if(this.error == 'Missing Data'){

    // }
    // else{
    //   this.toastr.error(this.error);
    // }
    // this._router.navigate(['/ProfileView']);
  }
}
