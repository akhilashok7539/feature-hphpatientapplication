import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../_model/login';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :FormGroup;
  public loginmodel:Login;
  submitted = false;
  profileId = 7;
  error: any;
  dataerror: string;
  constructor(private router:Router,private formBuilder: FormBuilder,
    private loginservice:LoginService,private toaster:ToastrService,
     private _activatedRoute:ActivatedRoute) {
    this.loginmodel = new Login();
   }
 
  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      userName:['',Validators.required],
      password:['',Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }
  login(){
    this.submitted = true; 

    // if(this.loginmodel.userName == null && this.loginmodel.password == null){
    //   this.toaster.error('Please fill the details');
    //   return;
    // }
    // else if(this.loginmodel.userName == null)
    // {
    //   this.toaster.error('Please enter Username');
    //   return;
    // }
    // else if(this.loginmodel.password == null)
    // {
    //   this.toaster.error('please enter the password');
    //   return;
    // }
    if (this.loginForm.invalid) {
      return;
    }
    else if (this.loginForm.valid) {
    let req ={
      "profileId":this.profileId,
      "username":this.loginmodel.userName,
      "password":this.loginmodel.password
    }
    console.log(req)
    this.loginservice.userLogIn(req).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
    }
    // this.router.navigate(['/Home']);
  }
  handlerSucess(data){
    console.log(data)
    // sessionStorage.setItem('currentCCdetails',data)
    this.router.navigate(['/patient-list']);
    //this.toaster.success('CC login Successfully');

  }
  handlerError(error){
    this.error = error.error['error'];
    console.log(this.error)
    if(this.error === 'Missing Data'){
      // console.log(error)
      this.dataerror = 'Please Enter a Valid UserName and Password';
      this.toaster.error(this.dataerror);
    }
    else if(this.error == 'Invalid Email')
    {
      this.dataerror = 'Please enter a valid Email ID';
      this.toaster.error(this.dataerror);
    }
    else{
      this.dataerror =error.error['error'] ;
      console.log(this.dataerror)
      this.toaster.error(this.dataerror);
    }
    
  }
}
