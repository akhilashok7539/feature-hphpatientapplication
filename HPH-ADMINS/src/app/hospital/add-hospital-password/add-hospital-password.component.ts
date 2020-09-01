import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/_models/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/department/department.service';
import { DatasharingService } from '../_shared/datasharing.service';
import { HospitalService } from '../hospital.service';
import { MustMatch } from '../../_helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-hospital-password',
  templateUrl: './add-hospital-password.component.html',
  styleUrls: ['./add-hospital-password.component.css']
})
export class AddHospitalPasswordComponent implements OnInit {

  citys:any;
  loading: boolean;
  // hospitalId=1;
  profileId=6;
  speciality = [];
  city =[];
  doctorDetails =[];
  uId:any;
  public doctor:Doctor;
  doctorId:any;
  hospitalForm :FormGroup;
  public doctorModel:Doctor;
  hospitalId: string;
  submitted = false;

  constructor(private router:Router,private departService:DepartmentService,
    private formBuilder: FormBuilder,private datasharing:DatasharingService,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private hospitalservice:HospitalService) {
    this.doctorModel =new Doctor();
   }
  ngOnInit() {
    
    this.datasharing.currentUserId.subscribe(userId =>this.hospitalId = userId);
    console.log(this.hospitalId)

    this.hospitalForm = this.formBuilder.group({


      password:['',[Validators.required, Validators.minLength(8)]],
      confirmPassword:['',Validators.required]
    },{
      validator: MustMatch('password', 'confirmPassword')
    });
    }
    get f() { 
      return this.hospitalForm.controls; 
    }
  
  
    next(){

    
    this.submitted = true; 

    if (this.hospitalForm.invalid) {
      return;
    }
    else if (this.hospitalForm.valid){
    
      let req ={
      "profileId":this.profileId,
	    "userId": this.hospitalId,
      "password":this.doctorModel.password
    }
    console.log(req)
    this.hospitalservice.addPassword(req).subscribe(
      data =>this.handlersucess(data),
      error=>this.handlerError(error)
    )
    }
  }

  handlersucess(data){
  console.log('sucess')
  this.toaster.success('Hospital added sucessfully');
  this.router.navigate(['/statusChange']);
  }
  handlerError(error){
    this.toaster.error('Password must alteast 8 character');
  }

}
