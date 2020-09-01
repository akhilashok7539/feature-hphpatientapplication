import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HospitalOtpVerificationComponent } from './hospital-otp-verification/hospital-otp-verification.component';
import { UserService } from '../home/profile/user.service';
import { SearchService } from '../home/bookanappointment/search.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Hospital } from '../_models/hospital';

@Component({
  selector: 'app-hospital-registration',
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.css']
})
export class HospitalRegistrationComponent implements OnInit {
  isVerified = false;
  animal: any;
  registrationForm:FormGroup;
  public model:Hospital;
  registeredby:boolean = false;
  profileId = 6;
  city: any;
  submitted = false;
  mobNumber: string;
  constructor(public dialog: MatDialog,private userService:UserService,private toaster:ToastrService,
    private router:Router,private searchservice:SearchService ,private formBuilder: FormBuilder) 
  {
    this.model=new Hospital();
   }

  ngOnInit() {
    this.model.hospitalType = '';
    this.model.city = '';
    this.searchservice.getCity().subscribe(
      data => {
        this.city = data;
        console.log(this.city)

      }
    )
    this.registrationForm = this.formBuilder.group({
   
      hospitalname: ['', Validators.required],
      // mobNo:['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      contactPersonName:['',Validators.required],
      contactpersonNumber:['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      contactPersonemail:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      hospitalType:['',Validators.required],
      city:['',Validators.required],

    });
  }
  // openDialog() {
  //   this.mobNumber = this.model.mobNo;
  //   const dialogRef = this.dialog.open(HospitalOtpVerificationComponent, {
  //     height: '350px',
  //     data:this.mobNumber
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result)
  //   });
      
  // }
  get f() { return this.registrationForm.controls; }

  register(){
    this.submitted = true; 
    if(this.registrationForm.invalid)
    {
      return;
    }
    else if(this.registrationForm.valid)
      {
    let req ={
      "profileId": this.profileId,
      "cityId": this.model.city,
      "hospitalName": this.model.hospitalname,
      "contactName": this.model.contactPersonName,
      "contactPhone": this.model.contactpersonNumber,
      "contactEmail":this.model.contactPersonemail,
      "hospitalType": this.model.hospitalType,
      "isRegisteredByAdmin":this.registeredby
    }
    console.log(req);
    
    sessionStorage.setItem('hospitalDetails',JSON.stringify(req));
    this.router.navigate(['/HospitalOtpVerification']);
  }
  }
}
