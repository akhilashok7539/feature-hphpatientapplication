import { Component, OnInit } from '@angular/core';
import { MustMatch } from './mustmatch';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Patient } from '../_model/patient';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../home/doctor/doctor.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loading: boolean;
  // hospitalId=60001;
  submitted = false;
  profileId = 4;
  doctorDetails =[];
  uId:any;
  public doctor:Patient;
  doctorId:any;
  resetForm :FormGroup;
  public doctormodel:Patient;
  hospitalId: any;
  ccid: any;

    
  constructor(private router:Router,private formBuilder: FormBuilder,private datePipe:DatePipe,
    private _activatedRoute:ActivatedRoute ,private toaster:ToastrService,
   private doctorservice:DoctorService) {
      this.doctormodel =new Patient();
     }

  ngOnInit() {
    // const users = JSON.parse(localStorage.getItem('currentCc'));
    // this.ccid = users['ccId'];
    var data = this.datePipe.transform(new Date(),"hh:mm:ss a");
    console.log(data);
    this.resetForm = this.formBuilder.group({

      password:['',[Validators.required, Validators.minLength(8)]],
      confirmPassword:['',Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }
    );
  }
  get f() { return this.resetForm.controls; }
  reset(){
    this.submitted = true; 

    if (this.resetForm.invalid) {
      return;
    }
    else if (this.resetForm.valid){
      let userId = localStorage.getItem("currentuserId");
    let req ={
      "profileId":this.profileId,
      "userId":userId,
      "password":this.doctormodel.password
    }
    console.log(req)
    this.doctorservice.resetPassword(req).subscribe(
      data =>this.handlerSucess(data),
      error =>this.handlerError(error)

    )
    }
  }
  handlerSucess(data){
    console.log('SUCESS');
    this.toaster.success('Password Reset Successfully');
    localStorage.clear();
    this.router.navigate(['/Login']);
    console.log(data)
    
  }
  handlerError(error){
    console.log(error)
    this.toaster.error('Unable to reset password');
    console.log('ERROR');
  }

}
