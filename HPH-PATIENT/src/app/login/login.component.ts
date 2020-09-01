import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from './login';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  loginForm :FormGroup;
  submitted = false;
  profileId=1;
  public loginmodel:Login;
  errors: any;
  headers: any;
  config: any;
  hide = true;
  constructor(private formBuilder: FormBuilder,
    private router: Router,private toastr: ToastrService,
    private loginService:LoginService) {
      this.loginmodel =new Login();
    }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      mobNo:['',Validators.required],
      password: ['', Validators.required]
      });
  }
  login(){

  if(this.loginmodel.password == null && this.loginmodel.mobNo == null){
      this.toastr.error('Please fill the details')
      return;
    }
    else if(this.loginmodel.mobNo == null && this.loginmodel.password != null ){
      this.toastr.error('Please enter mobile number');
      return;
    }
    else if(this.loginmodel.mobNo != null && this.loginmodel.password == null ){
      this.toastr.error('Please enter your password ');
      return;
    }
   
    let req = {
      "username" : this.loginmodel.mobNo,
      "password" : this.loginmodel.password,
      "profileId":this.profileId
    };
    //console.log(req);
    this.loginService.login(req)
    .subscribe(
      data => this.handleSuccess(data),
      error => this.catchError(error)
    );
    
}
  errorMessage:string="";
  catchError(error){
    this.errors = error.error['error'];
    if(this.errors == 'Missing Data'){
      this.toastr.error('Please fill the details');
    }
    else if(this.errors == 'Invalid Number'){
      this.toastr.error('Please enter a valid mobile number');
    }
    else{
      this.toastr.error(this.errors);
    }
   
  }
  handleSuccess(data) {
  
    this.loading = false;
    const dataRes: any = data;
    const uId: any = dataRes.body.patientId;
    const userdata: any = dataRes.firstName;
    localStorage.setItem('currentPatient', JSON.stringify(data.body));
    
    localStorage.setItem('currentPatientid', uId);
    // this.toastr.success('Sucessfully Logged In');
    sessionStorage.setItem('isLoggedin','true');
    this.router.navigate(['/Home']);
    
    // console.log(data.httpheaders)
    // const keys = data.headers.keys();
    // let headers = keys.map(key => {
    //   `${key}: ${data.headers.get(key)}`
    //     main_headers[key] = data.headers.get(key)
    //     console.log(main_headers)
    //    });
    // console.log(data.headers.get('JWT-TOKEN'));
    //  console.log(data.headers.get('JWT-TOKEN'));
    // return data;
  }
  register()
  {
    this.router.navigate(['/register']);
  }
}
