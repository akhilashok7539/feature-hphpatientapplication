import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../_model/login';
import { PatientService } from '../home/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  profileId =7;
  resetEmailForm:FormGroup;
  public loginmodel:Login;
  messages: any;
  resetEmail: string;
  dataerror: any;
  button = 'Reset Password';
  isLoading = false;
  constructor(private router:Router,private toaster:ToastrService,
    private formBuilder: FormBuilder, private _activatedRoute:ActivatedRoute,private patientService:PatientService)
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
    if(this.loginmodel.email == null){
      this.messages = 'Please enter a valid Email ID'
      this.toaster.error('Please enter a valid Email ID');
      this.isLoading = false;
      this.button = 'Reset Password';
      return;
    }
    
    else {
      let req = {
        "profileId":this.profileId,
        "username":this.loginmodel.email
  
      }
      this.patientService.resetPasswordEmail(req).subscribe(
        data => this.handlerSucess(data),
        error => this.handlerError(error)
      )
    }
 
   
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
    this.dataerror =error.error['error'];
    this.toaster.error(this.dataerror);
  }
}
