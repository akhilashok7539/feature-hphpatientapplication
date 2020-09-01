import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/_model/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../doctor.service';
import { DataService } from 'src/app/_helpers/data.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  values = 0;
  color = 'primary';
  mode = 'determinate';
  value = 12;
  bufferValue = 75;

  loading: boolean;
  hospitalId:any;
  speciality = [];
  city =[];
  submitted = false;
  profileId=4;
  doctorDetails =[];
  uId:any;
  valuesFromdata :any;
  public doctor:Doctor;
  doctorId:any;
  doctorForm :FormGroup;
  public doctormodel:Doctor;
  error: any;
  Practise: any;
  registeredby:boolean = true;
  privatepracticespeciality:any;
  privatepracticecity:any = '';
  privatepracticefees:any;
  addressprivatepractice:any;
  i;
  constructor(private router:Router,private datasharing:DataService,
    private formBuilder: FormBuilder,private toaster:ToastrService,private doctorservice:DoctorService) {
      this.doctormodel =new Doctor();
     }

  ngOnInit() {
   
    this.doctormodel.specId = '';
    this.Practise = 'false';
    this.privatepracticespeciality = '';
    this.doctormodel.specilaity = '';
    this.doctormodel.newCity = '';
    console.log(this.Practise);
    console.log(this.doctormodel.gender)
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalId = users['hospitalId'];
    this.doctorservice.getSpeciality().subscribe(
      data=>{
        this.speciality =data;
        console.log( this.speciality)
      })

      this.doctorservice.getCity().subscribe(
        data =>{
        this.city =data; 
        console.log(this.city)
      
      })
    const data = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.doctormodel.cityId = data.city['cityId'];
    this.doctorForm = this.formBuilder.group({


      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      dob: ['',Validators.required],
      // gender: ['',Validators.required],
      mobNo: ['',Validators.required],
      email: ['',Validators.required],
      specId: ['',Validators.required],
      cityId: ['',Validators.required],
      // hospitalId: ['',Validators.required],
      fee: ['',Validators.required],
      joiningdate: ['',Validators.required],
     
      });
      this.doctormodel.gender = 'Male';

  
  }
  nextClicked(){
    console.log(this.values)
    this.values = this.values+1;
  }
  qualificationWorks(){
    console.log(this.values)
    this.values = this.values+1;
  }
  timmingaddded(){
    this.values = this.values+1;
  }
  medicalRegProof(){
    this.values = this.values+1;

  }
  NextidProoF(){
    this.values = this.values+1;
  }
  NextSymptoms(){
    this.values = this.values+1;

  }
  get f() { return this.doctorForm.controls; }
  
  next(){

    this.submitted = true; 

    if (this.doctorForm.invalid) {
      console.log(this.doctorForm.value)

      return;
    }
    else if (this.doctorForm.valid){
      console.log(this.doctorForm.value)
    let req ={
     
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
      "hosiptalList":[
        {
          "hospitalId":this.hospitalId,
			    "specId": this.doctormodel.specId,
          "cityId": this.doctormodel.cityId,
          "fee": this.doctormodel.fee,
          "joiningDate":this.doctormodel.joiningdate,
        }
      ]
    }
  console.log(req)
  // this.reqest=req;
  // localStorage.setItem("doctorprofile",JSON.stringify(req));
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
  this.values = this.values +1;
  // this.datasharing.changeDoctorId( this.values);
  // this.value = this.value +12;
  // this.router.navigate(['/add-address']);

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
    //this.toaster.error('Please fill the details');
  }
  }
  // next()
  // {
  // this.value = this.value +1;
  // }
  isSelected(index: number) {
        if (this.values == index) {
            return false;
        } else {
            return true;
        }
    }
  // getAllHospital()
  // {
  //   this.doctorservice.getalllhospitalactive().subscribe(
  //     data =>{

  //     },
  //     error =>{

  //     }
  //   )
  // }
}
