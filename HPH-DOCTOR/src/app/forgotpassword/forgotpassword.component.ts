import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../_model/login';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../home/doctor/doctor.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  profileId =4;
  resetEmailForm:FormGroup;
  public loginmodel:Login;
  resetEmail: string;
  button = 'Reset Password';
  isLoading = false;
  errors: any;
  constructor(private router:Router,private formBuilder: FormBuilder,private toaster:ToastrService,
    private _activatedRoute:ActivatedRoute,private doctorservice:DoctorService)
   {
    this.loginmodel = new Login();
    }

  ngOnInit() {
    this.resetEmailForm = this.formBuilder.group({

      email:['',Validators.required]
    });
      
  }
  reset(){
    this.isLoading = true;
    this.button = 'Processing...';
    let req = {
      "profileId":this.profileId,
      "username":this.loginmodel.email
    }
    this.doctorservice.resetPasswordEmail(req).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
   
  }
  handlerSucess(data){
    this.isLoading = false;
    this.button = 'Reset Password';
    console.log(data)
     this.resetEmail = 'An email has been sent to the provided email ID. Please follow the link received in your mail to reset your password';
  }
  handlerError(error){
    this.isLoading = false;
    this.button = 'Reset Password';
    this.errors = error.error['error'];
    if(this.errors == 'Missing Data'){
    this.toaster.error('Please enter a valid email ID');
   }
     else if(this.errors == 'User not found'){
    this.toaster.error('Email ID is not registered');
  }
 else{
  this.toaster.error(this.errors)
 }
  }
}
