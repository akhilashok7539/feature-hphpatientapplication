import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/_model/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../doctor/doctor.service';
@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent implements OnInit {
  values = 0;
  color = 'primary';
  mode = 'determinate';
  value = 12;
  bufferValue = 75;
  consultationfee: any;
  address2: any;
  address1: any;
  loading: boolean;
  hospitalId: any;
  speciality = [];
  city = [];
  submitted = false;
  profileId = 4;
  doctorDetails = [];
  hospitalDetailsId:any;
  uId: any;
  valuesFromdata: any;
  public doctor: Doctor;
  specialitydetails:any;
  doctorId: any;
  doctorForm: FormGroup;
  public doctormodel: Doctor;
  cityIdDetails:any;
  error: any;
  Practise: any;
  registeredby: boolean = true;
  hospitalListCity: any;
  consultfee:any;
  joiningdatedoc:any;
  privatepracticespeciality:any = '';
  privatepracticecity:any = '';
  privatepracticefees:any;
  addressprivatepractice:any;
  constructor(private router: Router,
    private formBuilder: FormBuilder, private toaster: ToastrService, private doctorservice: DoctorService) {
    this.doctormodel = new Doctor();
  }

  ngOnInit() {
    this.doctormodel.gender = 'Male';
    this.doctormodel.specId = '';
    this.Practise = 'false';
    console.log(this.Practise);
    console.log(this.doctormodel.gender)
    // const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    // this.hospitalId = users['hospitalId'];
    this.doctorservice.getSpeciality().subscribe(
      data => {
        this.speciality = data;
        console.log(this.speciality)
      })

    this.doctorservice.getCity().subscribe(
      data => {
        this.city = data;
        console.log(this.city)

      })
    // const data = JSON.parse(localStorage.getItem('CurrentHospital'));
    // this.doctormodel.cityId = data.city['cityId'];
    this.doctorForm = this.formBuilder.group({


      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      mobNo: ['', Validators.required],
      email: ['', Validators.required],
      specId: ['', Validators.required],
      cityId: ['', Validators.required],
      hospitalId: ['', Validators.required],
      fee: ['', Validators.required],
      joiningdate: ['', Validators.required],
      cityNameDetails:['', Validators.required],
      hospitalDetailsId:['', Validators.required],
      // specialitydetails:['', Validators.required],
      // joiningdatedoc:['', Validators.required],
      // consultfee:['', Validators.required],
    });
    let userId = JSON.parse(localStorage.getItem("currentuserId"));

    this.viewprofile(userId);
  }
  viewprofile(userId) {
    this.doctorservice.getdocById(+userId).subscribe(
      data => this.handleSuccess(data)
      // this.doctorForm.setValue(data);
      // console.log(this.doctorForm)

    );
  }
  handleSuccess(data) {
    console.log(data);
    console.log("success");
    this.doctormodel = data;
    this.doctormodel.firstName = this.doctormodel['firstName'];
    this.doctormodel.lastName = this.doctormodel['lastName'];
    this.doctormodel.dob = this.doctormodel['dob'];
    this.doctormodel.gender = this.doctormodel['gender'];
    this.doctormodel.mobNo = this.doctormodel['mobNo'];
    this.doctormodel.email = this.doctormodel['email'];
    this.doctormodel.specId = this.doctormodel.spec['specId'];
    this.doctormodel.joiningdate = this.doctormodel['joiningDate'];
    this.doctormodel.cityId = this.doctormodel.city['cityId'];
    this.doctormodel.fee = this.doctormodel['fee'];
    this.hospitalId = this.doctormodel.hospital['hospitalId'];
  }
  nextClicked() {
    console.log(this.values)
    this.values = this.values + 1;
  }
  qualificationWorks() {
    console.log(this.values)
    this.values = this.values + 1;
  }
  timmingaddded() {
    this.values = this.values + 1;
  }
  medicalRegProof() {
    this.values = this.values + 1;

  }
  NextidProoF() {
    this.values = this.values + 1;
  }
  NextSymptoms() {
    this.values = this.values + 1;

  }
  get f() { return this.doctorForm.controls; }
  next() {

    this.submitted = true;
    let userId = localStorage.getItem("currentuserId");

    // if (this.doctorForm.invalid) {
    //   return;
    // }
    // else if (this.doctorForm.valid){
    let req = {
      "doctorId": userId,
      "firstName": this.doctormodel.firstName,
      "lastName": this.doctormodel.lastName,
      "dob": this.doctormodel.dob,
      "gender": this.doctormodel.gender,
      "mobNo": this.doctormodel.mobNo,
      "email": this.doctormodel.email,
      // "specId": this.doctormodel.specId,
      // "cityId": this.doctormodel.cityId,
      // "hospitalId": this.hospitalId,
      // "joiningDate": this.doctormodel.joiningdate,
      // "fee": this.doctormodel.fee,
      "profileId": this.profileId,
      "isPrivatePratice": this.Practise,
      "privatePraticeCityId": this.privatepracticecity,
      "privatePraticeSpecId": this.privatepracticespeciality,
      "privatePraticeAddress":this.addressprivatepractice,
      "privatePraticeFee":this.privatepracticefees,
      "hosiptalList":[
        {
          "specId": this.doctormodel.specId,
          "cityId": this.doctormodel.cityId,
          "hospitalId": this.hospitalId,
          "joiningDate": this.doctormodel.joiningdate,
          "fee": this.doctormodel.fee,
        }
      ]
      // "isRegisteredByHospital":this.registeredby
    }
    console.log(req)

    this.doctorservice.updateDoc(req).subscribe(
      data => this.handlesucess(data),
      error => this.errorHandler(error)
    )

  }
  handlesucess(data) {
    console.log('success');
    this.toaster.success('Basic details added successfully');
    this.doctormodel.data = data.doctor;
    this.doctormodel.doctorId = this.doctormodel.data['doctorId'];

    // this.datasharing.changeDoctorId(this.doctormodel.doctorId);
    sessionStorage.setItem("editUserId", this.doctormodel.data['doctorId'].toString());
    // sessionStorage.setItem("editUserId", doc.doctorId.toString());
    console.log(sessionStorage);
    this.values = this.values + 1;
    // this.datasharing.changeDoctorId( this.values);
    // this.value = this.value +12;
    // this.router.navigate(['/add-address']);

  }
  errorHandler(error) {
    this.error = error.error['error'];
    console.log(this.error)
    if (this.error == 'Invalid Number') {
      this.toaster.error('Please enter a valid Mobile Number');
    }
    else if (this.error == 'Invalid Email') {
      this.toaster.error('Please enter a valid Email ID');
    }
    else if (this.error == 'Email already registered with another user') {
      this.toaster.error('Email already registered with another user');
    }
    else if (this.error == 'Missing Data') {
      //this.toaster.error('Please fill the details');
    }
  }
  // next()
  // {
  // this.value = this.value +1;
  // }

  getcityselected(cityselected)
  {
    console.log(cityselected)
    this.doctorservice.gethospitalall(cityselected).subscribe(
      data =>{
        this.hospitalListCity = data;
      },
      error =>{
      
      }
    )
  }
  isSelected(index: number) {
    if (this.values == index) {
      return false;
    } else {
      return true;
    }
  }

}
