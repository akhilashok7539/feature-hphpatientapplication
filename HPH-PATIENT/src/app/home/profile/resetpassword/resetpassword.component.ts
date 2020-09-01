import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/login/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MustMatch } from './password-validation';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  public loginmodel: Login;
  form: FormGroup;
  profileId = 1;
  submitted = false;

  patientId: any;
  constructor(public formBuilder: FormBuilder, private userService: UserService, 
    private toaster: ToastrService, private router: Router) {
    this.loginmodel = new Login();
  }
  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('currentPatient'));
    // console.log(users)
    this.patientId = users['patientId'];
    this.form = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    }
    );
  }
  get f() { return this.form.controls; }
  reset(){
    this.submitted = true; 

    if (this.form.invalid) {
      return;
    }
    else if (this.form.valid){
      let req = {
        "userId": this.patientId,
        "profileId": this.profileId,
        "password": this.loginmodel.password
      }
      this.userService.resetPassword(req).subscribe(
        data => this.handleSuccessprofile(data),
        error => this.handleErrorprofile(error));
    }
  }
  handleSuccessprofile(data) {
    console.log(data)
    this.toaster.success('Password reset successfully please login again');
    localStorage.clear();
    sessionStorage.setItem('isLoggedin','false');
    this.router.navigate(['/login']);
  }
  handleErrorprofile(error) {
    console.log(error)
    //this.toaster.error('Unable to update password');
    // this.router.navigate(['/ProfileView']);
  }
}
