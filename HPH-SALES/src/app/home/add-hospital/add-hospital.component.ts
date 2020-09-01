import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/_models/hospital';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HospitalService } from '../hospital.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {
  submitted = false;
  hospitalForm :FormGroup;
  public hospitalmodel:Hospital;
  profileId=6;
  isRegisteredBySales = 'true';
  registeredby = false;
  citys: any;
  HospitalsDeatils: any;
  hospitalId: any;
  error: any;
  salesId: any;
  constructor(private router:Router,private hospitalservice:HospitalService,
    private formBuilder: FormBuilder,private toasterservice:ToastrService,
    private _router: Router,
  ) {
    this.hospitalmodel =new Hospital();
   }
  ngOnInit() {
    this.hospitalmodel.hospitalType = '';
    this.hospitalmodel.cityId = '';
    this.salesId = JSON.parse(localStorage.getItem('sales'));
  
    this.hospitalForm = this.formBuilder.group({


      hospitalName:['',Validators.required],
      phone: ['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      contactName: ['',Validators.required],
      contactPhone: ['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      contactEmail: ['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      email: ['',[Validators.required ,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      desigination: ['',Validators.required],
      cityId: ['',Validators.required],
      hospitalType: ['',Validators.required],
     
      
      });
      this.hospitalservice.getCity().subscribe(
        data =>{
        this.citys =data; 
        console.log(this.citys)
      
      })
  
  }
  get f() { return this.hospitalForm.controls; }

  Next(){
     
    this.submitted = true;
    if (this.hospitalForm.invalid) {
      console.log('invalid')
    }
  
    else if (this.hospitalForm.valid){
      console.log('valid')
      let req ={
        "profileId": this.profileId,
        "cityId": this.hospitalmodel.cityId,
        "hospitalName": this.hospitalmodel.hospitalName,
        "phone": this.hospitalmodel.phone,
        "email": this.hospitalmodel.email,
        "contactName": this.hospitalmodel.contactName,
        "contactPhone": this.hospitalmodel.contactPhone,
        "contactEmail":this.hospitalmodel.contactEmail,
        "hospitalType": this.hospitalmodel.hospitalType,
        "designationOfRegisteringPerson":this.hospitalmodel.desigination,
        "isRegisteredBySales":1,
        "salesId":this.salesId.salesId,
        "isRegisteredByAdmin":0
      }
      console.log(req)
      this.hospitalservice.addHospital(req).subscribe(
        data =>this.handlerSucess(data),
        error => this.handlerError(error)
      )
    }
  }
  handlerSucess(data){
    console.log(data)
    this.HospitalsDeatils = data.hospital;
    // console.log( this.doctormodel.data)
    this.hospitalId = this.HospitalsDeatils['hospitalId'];
    console.log( this.hospitalId)
    sessionStorage.setItem("hospitalId",this.hospitalId)
    this.toasterservice.success('Basic details added successfully');
    this.router.navigate(['/addHospitalAddress']);
    // alert('An email has been sent to the provided email ID with their user credentials');

    // this.router.navigate(['/Home']);

  }
  handlerError(error){
    // console.log(error)
    this.error = error.error['error'];
    
    if(this.error == 'Email already registered with another user')
    {
      this.toasterservice.error("Email ID is already registered with another user")
    }
    else{
      this.toasterservice.error(this.error);
    }
    
  }
}
