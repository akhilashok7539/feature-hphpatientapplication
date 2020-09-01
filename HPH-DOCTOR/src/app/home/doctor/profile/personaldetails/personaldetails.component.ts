import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/_model/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-personaldetails',
  templateUrl: './personaldetails.component.html',
  styleUrls: ['./personaldetails.component.css']
})
export class PersonaldetailsComponent implements OnInit {
  view = false;
  loading: boolean;
  hospitalId:any;
  speciality = [];
  city =[];
  submitted = false;
  profileId=4;
  doctorDetails =[];
  uId:any;
  public doctor:Doctor;
  doctorId:any;
  doctorForm :FormGroup;
  public doctormodel:Doctor;
  error: any;
  practise: any;
  privatepracticecity: any;
  addressprivatepractice: any;
  privatepracticespeciality: any;
  privatepracticefees: any;
  errormessage: any;
  constructor(private router:Router,private formBuilder: FormBuilder,private doctorservice:DoctorService,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private _router: Router) {
      this.doctormodel =new Doctor();
     }

  ngOnInit() {
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
    let userId = localStorage.getItem("currentuserId");
    this.doctorForm = this.formBuilder.group({


      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      dob: ['',Validators.required],
      gender: ['',Validators.required],
      mobNo: ['',Validators.required],
      email: ['',Validators.required],
      specId: ['',Validators.required],
      cityId: ['',Validators.required],
      hospitalId: ['',Validators.required],
      fee: ['',Validators.required],
      
      
      });
      this.viewprofile(+userId);
    this.doctorForm.disable();

  }
  viewprofile(userId){
    this.doctorservice.getdocById(+userId).subscribe(
      data =>this.handleSuccess(data)
      // this.doctorForm.setValue(data);
      // console.log(this.doctorForm)
  
    );
  }
  handleSuccess(data){
    console.log(data);
    console.log("success");
    this.doctormodel= data;
    this.doctormodel.firstName = this.doctormodel['firstName'];
    this.doctormodel.lastName = this.doctormodel['lastName'];
    this.doctormodel.dob = this.doctormodel['dob'];
    this.doctormodel.gender = this.doctormodel['gender'];
    this.doctormodel.mobNo = this.doctormodel['mobNo'];
    this.doctormodel.email = this.doctormodel['email'];
    this.doctormodel.specId = this.doctormodel.spec['specId'];
    
    this.doctormodel.cityId = this.doctormodel.city['cityId'];
    this.hospitalId = this.doctormodel.hospital['hospitalId'];
    this.doctormodel.joiningdate = this.doctormodel['joiningDate'];

    this.doctormodel.fee = this.doctormodel['fee'];
    this.practise = this.doctormodel['privatePratice'];
    if(this.practise == true)
    {
      this.privatepracticecity = this.doctormodel['privatePraticeCity'].cityId;
      this.addressprivatepractice = this.doctormodel['privatePraticeAddress'];
      this.privatepracticespeciality = this.doctormodel['privatePraticeCity'].specId;
      this.privatepracticefees = this.doctormodel['privatePraticeFee'];
    }
   
    
    console.log( 'Hosiptal id '+this.hospitalId)
  }
  edit(){
    this.view = true;
    this.doctorForm.enable();
  }
  next(){
    let userId = localStorage.getItem("currentuserId");
    let req ={
      "doctorId":userId,
      "firstName":this.doctormodel.firstName,
      "lastName": this.doctormodel.lastName,
      "dob": this.doctormodel.dob,
      "gender":this.doctormodel.gender,
      "mobNo": this.doctormodel.mobNo,
      "email":this.doctormodel.email,
      "isPrivatePratice":this.practise,
      "privatePraticeCityId":this.privatepracticecity,
      "privatePraticeAddress":this.addressprivatepractice,
      "privatePraticeSpecId":this.privatepracticespeciality,
      "privatePraticeFee":this.privatepracticefees,
      "hosiptalList":[
        {
          "specId": this.doctormodel.specId,
          "cityId": this.doctormodel.cityId,
          "hospitalId":this.hospitalId,
          "fee": this.doctormodel.fee,
          "joiningDate":this.doctormodel.joiningdate
        }
      ]
    }

    this.doctorservice.updateDoc(req).subscribe(
      data => this.handlesucess(data),
      error =>this.errorHandler(error)
    )
  }
  handlesucess(data){
    // this.router.navigate(['/doctorAddress']);
    this.toaster.success('Personal Details Updated');
    this.doctorForm.disable();
    this.view = false;



  }
  errorHandler(error){
    this.errormessage = error.error['error'] ;
    this.toaster.error(this.errormessage)
  }
}
