import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/_model/doctor';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor/doctor.service';
import { MustMatch } from 'src/app/_helpers/mustmatch';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loading: boolean;
  // hospitalId=60001;

  profileId = 6;

  doctorDetails = [];
  uId: any;
  public doctor: Doctor;
  doctorId: any;
  resetForm: FormGroup;
  public doctormodel: Doctor;
  hospitalId: any;
  error: any;
  submitted = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private toaster: ToastrService,
    private _router: Router, private doctorservice: DoctorService) {
    this.doctormodel = new Doctor();
  }
  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalId = users['hospitalId'];
    this.resetForm = this.formBuilder.group({

      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
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
      "userId":this.hospitalId,
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
    this.router.navigate(['/Login']);
    this.toaster.success('Password reset sucessfully please login again');
    localStorage.clear();
    console.log(localStorage)
  }
  handlerError(error){
    console.log(error)
    this.error = error.error['error'];
    
  }
}