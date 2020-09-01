import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/_models/hospital';
import { UserService } from 'src/app/home/profile/user.service';
import { ToastrService } from 'ngx-toastr';
import { SearchService } from 'src/app/home/bookanappointment/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospital-email-id',
  templateUrl: './hospital-email-id.component.html',
  styleUrls: ['./hospital-email-id.component.css']
})
export class HospitalEmailIdComponent implements OnInit {
  registrationForm:FormGroup;
  public model:Hospital;
  submitted = false;  
  error: any;

  constructor(private userService:UserService,private toaster:ToastrService,
    private router:Router,private searchservice:SearchService ,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.model=new Hospital();
    this.registrationForm = this.formBuilder.group({
      emailId:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }
  get f() { return this.registrationForm.controls; }
  next(){
    this.submitted = true; 
    if(this.registrationForm.invalid)
    {
      return;
    }
    else if(this.registrationForm.valid)
    {
      let req = {
        "username": this.model.emailId,
     }
     sessionStorage.setItem('email',JSON.stringify(req));
  
      this.userService.verifyEmail(req).subscribe(
        data => this.handlersucess(data),
        error => this.handlererror(error)
      )
    }
    
  }
  handlersucess(data){

    this.toaster.success('OTP send to your email ID')
    this.router.navigate(['/hospitalemailIdverification']);
  }
  handlererror(error){
    this.error = error.error['error'];
    this.toaster.error(this.error)

  }
}
