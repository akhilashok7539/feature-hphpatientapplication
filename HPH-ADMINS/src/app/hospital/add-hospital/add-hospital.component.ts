import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/department/department.service';
import { Observable } from 'rxjs';
import { Department } from 'src/app/_models/department';
import { Doctor } from 'src/app/_models/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../hospital.service';
import { DatasharingService } from '../_shared/datasharing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {
  citys:any;
  loading: boolean;
  submitted = false;
  // hospitalId=1;
 
  profileId=6;
  speciality = [];
  city =[];
  doctorDetails =[];
  uId:any;
  public doctor:Doctor;
  doctorId:any;
  hospitalForm :FormGroup;
  public doctormodel:Doctor;
  error: any;
  registeredby:boolean = true;

  constructor(private router:Router,private departService:DepartmentService,
    private formBuilder: FormBuilder,private datasharing:DatasharingService,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private _router: Router,private hospitalservice:HospitalService) {
    this.doctormodel =new Doctor();
   }

  ngOnInit() {
    this.doctormodel.hospitalType = '';
    this.doctormodel.cityId = '';
    this.hospitalservice.getCity().subscribe(
      data =>{
      this.citys =data; 
      console.log(this.citys)
    
    })

    this.hospitalForm = this.formBuilder.group({


      hospitalName:['',Validators.required],
      phone: ['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      contactName: ['',Validators.required],
      contactPhone: ['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      contactEmail: ['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      email: ['',[Validators.required ,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
     
      cityId: ['',Validators.required],
      hospitalType: ['',Validators.required],
     
      
      });
  }
  get f() { return this.hospitalForm.controls; }
  
  Next(){
     

    if (this.hospitalForm.invalid) {
      this.submitted = true;
    }
    else if(this.doctormodel.phone.length < 10){
  
      this.toaster.error('Please enter a valid number');
      return;
    }
    else if (this.hospitalForm.valid){
    let req ={
      "profileId": this.profileId,
      "cityId": this.doctormodel.cityId,
      "hospitalName": this.doctormodel.hospitalName,
      "phone": this.doctormodel.phone,
      "email": this.doctormodel.email,
      "contactName": this.doctormodel.contactName,
      "contactPhone": this.doctormodel.contactPhone,
      "contactEmail":this.doctormodel.contactEmail,
      "hospitalType": this.doctormodel.hospitalType,
      "isRegisteredByAdmin":this.registeredby
    }

    // console.log(req)
    this.hospitalservice.createNewHospital(req).subscribe(
      data =>this.handlerSucess(data),
      error => this.handlerError(error)
    )
    }
    // this,this.router.navigate(['/addHospitalAddress']);
  }
  handlerSucess(data){
   
    this.doctormodel.data = data.hospital;
    // console.log( this.doctormodel.data)
    this.doctormodel.hospitalId = this.doctormodel.data['hospitalId'];
    console.log( this.doctormodel.hospitalId)
    sessionStorage.setItem("hospitalId",this.doctormodel.hospitalId)
    this.datasharing.changeDoctorId( this.doctormodel.hospitalId);
    this.toaster.success('Basic details added successfully');
    this.router.navigate(['/addHospitalAddress']);
  }
  handlerError(error){
    // console.log(error)
    this.error = error.error['error'];
    
    if(this.error == 'Email already registered with another user')
    {
      this.toaster.error("Email ID is already registered with another user")
    }
    else{
      this.toaster.error(this.error);
    }
    
  }
  back(){
    this.router.navigate(['/Hospital']);
  }
  
}
