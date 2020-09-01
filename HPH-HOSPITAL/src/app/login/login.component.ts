import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../_model/login';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean;
  loginForm :FormGroup;
  profileId=6;
  submitted = false;
  public loginmodel:Login;
  errors:any;
  public error: any;

  constructor(private router:Router,private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,private toastr: ToastrService, private loginService:LoginService
    ) 
    {
      this.loginmodel =new Login();
     }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password: ['', Validators.required]
      });
  }
  get f() { return this.loginForm.controls; }
  login(){
    this.submitted = true; 
    if (this.loginForm.invalid) {
      return;
    }
    else if (this.loginForm.valid) {
      let req = {
        "profileId":this.profileId,
        "username":this.loginmodel.email,
        "password":this.loginmodel.password
      }
      console.log(req)
      this.loginService.login(req)
      .subscribe(
        data => this.handleSuccess(data),
        error => this.catchError(error)
      );
    }
    
  }
  handleSuccess(data){
    // console.log(HttpResponse)
    this.loading = false;
    console.log(data)
    console.log('login sucess')
    //this.toastr.success('Login Succesfully');
    this.router.navigate(['/Doctor']);
  }
  catchError(error){
    

    console.log(error.status);
    this.error = error.error['error'];
    if( this.error ==='Missing Data'){
      //this.errors = 'Please Enter the credentials';
    }
    else if( this.error ==='Invalid Email'){
      this.errors = error.error['error'];
      console.log(this.error)
      this.toastr.error(this.error)
      //this.toastr.error(this.error);
    }
    else {
      this.toastr.error(this.error)
    }
   
  }
  forgot(){
    this.router.navigate(['/Home']);
  }
}
