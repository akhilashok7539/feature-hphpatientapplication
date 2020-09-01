import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/_model/login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-administrator-login',
  templateUrl: './administrator-login.component.html',
  styleUrls: ['./administrator-login.component.css']
})
export class AdministratorLoginComponent implements OnInit {
  loading: boolean;
  loginForm :FormGroup;
  profileId=11;
  submitted = false;
  public loginmodel:Login;
  errors:any;
  public error: any;

  constructor(private router:Router,private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,private toastr: ToastrService, 
    private loginService:LoginService
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
      this.loginService.loginadministrator(req)
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
    localStorage.setItem('CurrentHospital',JSON.stringify(data));
    console.log(localStorage)
    localStorage.setItem('currentuserId',data.hospital.hospitalId);
    localStorage.setItem('currentstatus',data.hospital.profileStatus);
    console.log('login sucess')
    console.log(data.hospitalUserId);
    if(data.hospitalUserId != null )
    {
    localStorage.setItem('currenthospitalUserStatus','HOSPITAL_USER');

    }
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

}
