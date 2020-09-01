import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Login } from 'src/app/login/login';
import { UserService } from 'src/app/home/profile/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  registerOtp :FormGroup;
  loading: boolean;
  profileId=1;
  public loginmodel:Login;
  error: any;
  errorss: any;
  
  constructor(private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,
    private _router: Router,private toastr: ToastrService,
    private userService:UserService) {
      this.loginmodel =new Login();
     }
     ngOnInit() {
      this.registerOtp = this.formBuilder.group({
        otp:['',Validators.required]
       
        });
  
    }
    verify(){
      if(this.loginmodel.otp == null){
        this.toastr.error('Please enter the OTP')
      }
      else{
        let req ={
          "otp":this.loginmodel.otp
        }
        
        this.userService.verifyOtp(req).subscribe(
          data => this.Success(data),
          error => this.catchError(error)
        );
      }
   
    }
    Success(data){
      this.toastr.success('OTP verified successfully');
      this._router.navigate(['/verification']);
    }
    catchError(error){
      console.log(error)
      this.error = error.error['error']

      this.toastr.error('Please enter a valid OTP');
      //this._router.navigate(['/verification']);
    }
    
    sendOtp(){
      let mobno =  sessionStorage.getItem("mobno")
      let req ={
        "profileId":1,
        "username":mobno
      }
      this.userService.registerOtp(req).subscribe( 
        data =>this.Success1(data),
        error=>this.catchErrors(error)
        );
    }
    Success1(data){
     console.log(data)
     this.toastr.success('OTP sent to your registered mobile number');
    
    }
  errorMessages:string="";
  catchErrors(error){
    console.log(error)
    
    this.errorss = error.error['error'];
    if(this.errorss == 'Missing Data'){
      this.toastr.error('Please Fill the Details')
    }
    else{
      this.toastr.error(this.errorss);
    }
    }
}
