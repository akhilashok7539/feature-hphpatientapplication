import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../_models/login';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginmodel: Login;
  submitted = false;
  profileId = 10;
  error: any;
  constructor(private router:Router,private loginservice:LoginService,private toaster:ToastrService,
    private formBuilder: FormBuilder) 
  {
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

    if (this.loginForm.invalid) {
      return;
    }
    else if (this.loginForm.valid){
      let req ={
        "profileId":this.profileId,
        "username":this.loginmodel.userName,
        "password":this.loginmodel.password
      }
      console.log(req)
      this.loginservice.salesLogin(req).subscribe(
        data =>this.handlerSucess(data),
        error => this.handlerError(error)
      )
    }
  }
  handlerSucess(data){
    console.log(data)
    //this.toaster.success("Admin LoggedIn Sucessfully");
    localStorage.setItem('sales',JSON.stringify(data));

    this.router.navigate(['/Home']);
    }
    handlerError(error){
      console.log(error)
      this.error = error.error['error'];
      if(this.error == "No data found")
      {
        this.toaster.error("User not found");
      }
      else{
        this.toaster.error(this.error);
      }
     
      console.log(this.error)
      
    }
}
