import { Component, OnInit } from '@angular/core';
import { Patient } from '../_model/patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '../home/patient.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from './mustmatch';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loading: boolean;
  // hospitalId=60001;
  
  profileId = 12;
  doctorDetails =[];
  uId:any;
  public doctor:Patient;
  doctorId:any;
  resetForm :FormGroup;
  public doctormodel:Patient;
  hospitalId: any;
  ccid: any;
  submitted = false;
  constructor(private router:Router,private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
   private patientService:PatientService) {
      this.doctormodel =new Patient();
     }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('currentCc'));
    this.ccid = users['ccId'];

    
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
    let req ={
      "profileId":this.profileId,
      "userId":this.ccid,
      "password":this.doctormodel.password
    }
    console.log(req)
    this.patientService.resetPassword(req).subscribe(
      data =>this.handlerSucess(data),
      error =>this.handlerError(error)

    )
    }
  }
  handlerSucess(data){
    console.log('SUCESS');
    this.toaster.success('Password reset successfully.Please login again');
    localStorage.clear();
    this.router.navigate(['/patient-list']);
    console.log(data)
    
  }
  handlerError(error){
    console.log(error)
    this.toaster.error('Unable to reset password');
    console.log('ERROR');
  }

}
