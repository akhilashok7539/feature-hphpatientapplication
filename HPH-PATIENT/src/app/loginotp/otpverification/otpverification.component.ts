import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/app/login/login';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css']
})
export class OtpverificationComponent implements OnInit {
  loginForm:FormGroup;
  profileId=1;
  mobNo: string;
  public loginmodel:Login;
  error: any;
  constructor(private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,
    private _router: Router,private toastr: ToastrService,
    private loginService:LoginService) {
      this.loginmodel =new Login();
     }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      otp:['',Validators.required]
     
      });
  }

  verify(){
    if(this.loginmodel.otp == null){
      this.toastr.error('Please enter the OTP')
      return;
    }
    else {
  
   
    let req ={
      "otp":this.loginmodel.otp
    }
    console.log(req)
    this.loginService.verifyOtp(req).subscribe(
      data => this.Success(data),
      error => this.catchError(error)
    );
  }
  }
  Success(data) {
   
    this.toastr.success('OTP verified successfully');
    // this._router.navigate(['/verify&login']);
    this.verifytologin();
  }
  catchError(error){
    this.error = error.error['error'];
    this.toastr.error('Incorrect OTP');
    //this._router.navigate(['/Login']);loginOTP
  }
  
sendOtp(){
  console.log(this.mobNo)
  this.mobNo = sessionStorage.getItem('loginOTP');
  let req={
    "username" : this.mobNo,
    "profileId":this.profileId
  }

  // this.datasharing.changeMobNo(this.loginmodel.mobNo);
  this.loginService.sendOtpLogin(req).subscribe(
    data => this.handleSuccess1(data),
    error => this.catchError1(error)
  );
}
handleSuccess1(data){
this.toastr.success('OTP sent to your mobile number');
}
catchError1(error){
  this.error = error.error['error'];
  this.toastr.error(this.error);
}
verifytologin(){
  this.mobNo = sessionStorage.getItem('loginOTP');
  this.loginService.verifyToLogin(this.mobNo).subscribe(
    data => this.handleSuccess2(data),
      error => this.errorhandle(error)  
  )
}
handleSuccess2(data){
  const uId:any = data.patientId;
  localStorage.setItem('currentPatient',JSON.stringify(data));
  localStorage.setItem('currentPatientid',uId);
  sessionStorage.setItem('isLoggedin','true');
  console.log(localStorage)
  this._router.navigate(['/Home']);

}
errorhandle(error){

}
}
