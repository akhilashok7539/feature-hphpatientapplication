import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../home/profile/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  public model: User;
  submitted = false;
  profileId = 1;
  mobileNumber: any;
  errors: any;
  constructor(private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router, private userService: UserService, private toastr: ToastrService) {
    this.model = new User();
  }
  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobNo: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
    });
  }
  get f() { return this.registrationForm.controls; }
  sendOtp() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }
    else if (this.registrationForm.valid) {
      let req = {
        "profileId": this.profileId,
        "firstName": this.model.firstName,
        "lastName": this.model.lastName,
        "username": this.model.mobNo
      }
      console.log(req)
      sessionStorage.setItem('userRegisterDetails', JSON.stringify(req))
      this.mobileNumber = this.model.mobNo
      sessionStorage.setItem("mobno",this.mobileNumber)
      this.userService.registerOtp(req).subscribe(
        data => this.Success(data),
        error => this.catchErrors(error)
      );
    }
  }
  Success(data) {
    console.log(data)
    this.toastr.success('OTP send to your registered mobile number');
    this._router.navigate(['/verifyOtp']);
  }
  errorMessages: string = "";
  catchErrors(error) {
    console.log(error)
    this.errors = error.error['error'];
    if (this.errors == 'Missing Data') {
      //this.toastr.error('Please Fill the Details')
    }
    else if (this.errors == 'User already existing') {

      this.toastr.error('User already existing with the same mobile number')
    }
    else {

      //this.toastr.error(this.errors);
    }
  }

}
