import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from '../_models/hospital';
import { SearchService } from '../home/bookanappointment/search.service';
import { UserService } from '../home/profile/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css']
})
export class DoctorRegistrationComponent implements OnInit {
  registrationForm:FormGroup;
  public model:Hospital;
  // registeredby:boolean = true;
  citySelected: any ;

  city: any;
  speciality: any;
  hospitalList: any;
  profileId=4;
  registeredby :boolean = false;
  results: any;
  error: any;
  errors:any;
  submitted = false;
  isLoading = false;
  button = 'Register';
  constructor(private searchService:SearchService,private sharedService:UserService,
    private _router: Router,private toaster:ToastrService,
    private formBuilder: FormBuilder ){
    this.model=new Hospital();
   }

  ngOnInit() {
    this.citySelected = '';
    this.model.spec = '';
    this.model.hospitalname = '';
    this.model.gender = '';
    this.registrationForm = this.formBuilder.group({

      hospitalname: ['', Validators.required],
      mobNo: ['', Validators.required],
      emailId:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      dob:['',Validators.required],
      city:['',Validators.required],
      gender:['',Validators.required],
      spec:['',Validators.required],
      joiningDate:['',Validators.required],
      consoltationfee:['',Validators.required],
    
    });
    this.searchService.getCity().subscribe(
      data => {
        this.city = data;
        console.log(this.city)

      }
    )
    this.searchService.getSpeciality().subscribe(
      data => {
        this.speciality = data;
        console.log(this.speciality)
      }
    )
  }
  get f() { return this.registrationForm.controls; }
  next(){
    this.submitted = true;
    this.isLoading = true;
    this.button = 'Processing...';
    let req ={
 
     "firstName": this.model.firstname,
     "lastName": this.model.lastname,
     "dob": this.model.dob,
     "gender": this.model.gender,
     "mobNo": this.model.mobNo,
     "email": this.model.emailId,
     
     "profileId":this.profileId,
     "isRegisteredByAdmin":this.registeredby,
     "hosiptalList":[{
      "specId": this.model.spec,
      "cityId": this.citySelected,
      "hospitalId":this.model.hospitalname,
      "fee": this.model.consoltationfee,
     "joiningDate":this.model.joiningDate,

     }]
    }
    console.log(req)
    this.sharedService.addDoctor(req).subscribe(
      data=> this.handlerSucess1(data),
      error => this.handlerError(error)
    )
 
   }
   handlerSucess1(data)
   {
     this.isLoading = false;
     this.button= 'Register';
     window.scrollTo(0, 0)
     this.registrationForm.reset();
     
     this.results = data.response;
      console.log(data.response)
      this.toaster.success('An Email has been sent to the provided email ID with the user credentials');
   
   }
   handlerError(error){
     this.isLoading = false;
     this.button= 'Register';
     window.scrollTo(0, 100)
     this.error = error.error['error'];
     if(this.error == 'Missing Data'){
       //this.errors = 'Please Fill the Details';
       //this.toaster.error(this.errors);
     }
     else if(this.error == 'Invalid Email'){
       this.toaster.error('Please enter a valid Email ID');
     }
     else if(this.error == 'Invalid Number'){
       this.toaster.error('Please enter a valid phone number')
     }
     else{
        this.toaster.error(this.error);
     }
     
   
 
   }
   getcategroyType(cat){
     console.log(cat)
     this.searchService.gethospitalall(this.citySelected).subscribe(
       data => { 
         this.hospitalList = data;
         console.log(this.hospitalList)
       }
     )}
}
