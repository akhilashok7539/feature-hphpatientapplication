import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/login/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/home/profile/user.service';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/home/profile/resetpassword/password-validation';

@Component({
  selector: 'app-setup-password',
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.css']
})
export class SetupPasswordComponent implements OnInit {
  public loginmodel: Login;
  registrationForm: FormGroup;
  profileId = 1;
  submitted = false;
  userDetails: string;
  constructor(public formBuilder: FormBuilder, private userService: UserService, 
    private toaster: ToastrService, private router: Router) {
    this.loginmodel = new Login();
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    }
    );
  }
  get f() { return this.registrationForm.controls; }

  create(){
    this.userDetails = JSON.parse(sessionStorage.getItem('userRegisterDetails'));
    this.submitted = true; 

    if (this.registrationForm.invalid) {
      return;
    }
    else if (this.registrationForm.valid){
    let req ={
      "firstName":this.userDetails['firstName'],
      "lastName":this.userDetails['lastName'],
      "username":this.userDetails['username'],
      
      "profileId":this.profileId,
      "password":this.loginmodel.password
   }
  console.log(req)
  }
}
}
