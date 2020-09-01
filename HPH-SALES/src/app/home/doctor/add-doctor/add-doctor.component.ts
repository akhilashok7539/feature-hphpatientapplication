import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/_models/doctor';
import { DoctorService } from '../doctor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  doctorForm:FormGroup;
  public doctormodel:Doctor;
  submitted = false;
  Practise:any;
  city: any;
  speciality: any;
  privatepracticespeciality:any = '';
  privatepracticecity:any = '';
  privatepracticefees:any;
  addressprivatepractice:any;
  registeredby:boolean = false;
  profileId = 4;
  isregisterBySales :boolean = true;
  sales: any;
  citySeleted: any;
  hospitals: any;
  error: any;
  constructor(private fb:FormBuilder,private toaster:ToastrService,private router:Router,
    private doctorservice:DoctorService) { }

  ngOnInit() {
    this.Practise = 'false';
    this.doctormodel =new Doctor();
    this.doctorForm = this.fb.group({


      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      dob: ['',Validators.required],
      gender: ['',Validators.required],
      mobNo: ['',Validators.required],
      email: ['',Validators.required],
      specId: ['',Validators.required],
      cityId: ['',Validators.required],
      // hospitalId: ['',Validators.required],
      fee: ['',Validators.required],
      hospital:['',Validators.required],
      
      });
      this.getallcity();
      this.getallspeciality();
  }
  get f() { return this.doctorForm.controls; }
  next(){
    this.submitted = true;
    this.sales = JSON.parse(localStorage.getItem('sales'));


    if (this.doctorForm.invalid) {
      console.log(this.doctorForm.value);
      
      return;
    }
    else if (this.doctorForm.valid){

      let req = {
        "firstName": this.doctormodel.firstName,
        "lastName": this.doctormodel.lastName,
        "dob": this.doctormodel.dob,
        "gender": this.doctormodel.gender,
        "mobNo": this.doctormodel.mobNo,
        "email": this.doctormodel.email,
        "profileId":this.profileId,
        "isRegisteredByHospital":this.registeredby,
        "isPrivatePratice":this.Practise,
        "privatePraticeCityId":this.privatepracticecity,
        "privatePraticeAddress":this.addressprivatepractice,
        "privatePraticeSpecId":this.privatepracticespeciality,
        "privatePraticeFee":this.privatepracticefees,
        "isRegisteredBySales":this.isregisterBySales,
        "salesId":this.sales.salesId,
        "hosiptalList":[
          {
            "hospitalId":this.doctormodel.hospital,
            "specId": this.doctormodel.specId,
            "cityId": this.doctormodel.cityId,
            "fee": this.doctormodel.fee,
            "joiningDate":this.doctormodel.joiningdate,
          }
        ]
      }
      this.doctorservice.createDoc(req).subscribe(
        data => this.handlesucess(data),
        error =>this.errorHandler(error)
        )
    }
  }
  handlesucess(data){
    console.log('success');
    this.toaster.success('Basic details added successfully');
    this.doctormodel.data = data.doctor;
    this.doctormodel.doctorId = this.doctormodel.data['doctorId'];
   
    // this.datasharing.changeDoctorId(this.doctormodel.doctorId);
    sessionStorage.setItem("editUserId", this.doctormodel.data['doctorId'].toString());
    // sessionStorage.setItem("editUserId", doc.doctorId.toString());
    console.log(sessionStorage);
    // this.datasharing.changeDoctorId( this.values);
    // this.value = this.value +12;
    this.router.navigate(['/add-address']);
  
  }
  errorHandler(error){
    this.error = error.error['error'];
    console.log(this.error)
    if(this.error == 'Invalid Number')
    {
      this.toaster.error('Please enter a valid Mobile Number');
    }
    else if(this.error == 'Invalid Email')
    {
      this.toaster.error('Please enter a valid Email ID');
    }
    else if(this.error == 'Email already registered with another user'){
      this.toaster.error('Email already registered with another user');
    }
    else if(this.error == 'Missing Data'){
      this.toaster.error('Please fill the details');
    }
    }
  getallcity(){
    this.doctorservice.getCity().subscribe(
      data =>{
      this.city =data; 
      console.log(this.city)
    
    })
  }
  getallspeciality(){
    this.doctorservice.getSpeciality().subscribe(
      data=>{
        this.speciality =data;
        console.log( this.speciality)
      })
  }
  
  getcitSelected(event)
  {
    console.log(event.target.value)
    this.citySeleted = event.target.value;
    this.doctorservice.getallhospitalbycity(this.citySeleted).subscribe(
      data =>{
        this.hospitals = data
      },
      error =>{

      }
    )
  }
}
