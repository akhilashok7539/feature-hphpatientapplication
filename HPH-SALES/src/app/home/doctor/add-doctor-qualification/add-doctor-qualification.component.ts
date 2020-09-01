import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/_models/doctor';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../doctor.service';
import { hostViewClassName } from '@angular/compiler';

@Component({
  selector: 'app-add-doctor-qualification',
  templateUrl: './add-doctor-qualification.component.html',
  styleUrls: ['./add-doctor-qualification.component.css']
})
export class AddDoctorQualificationComponent implements OnInit {
  doctorForm :FormGroup;
  submitted = false;
  public doctormodel:Doctor;
  degree: any;
  council: any;
  college: any;
  error: any;
  doctorId: string;
  constructor(private router:Router,private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private _router: Router,private doctorservice:DoctorService) {

      this.doctormodel =new Doctor();
     }
  ngOnInit() {
    this.getallDegree();
    this.getallcollege();
    this.getallCouncil();
    this.doctorForm = this.formBuilder.group({


      degree:['',Validators.required],
      college: ['',Validators.required],
      stateCouncilName: ['',Validators.required],
      yearOfcompletion: ['',Validators.required],
      yearOfExperience: ['',Validators.required],
      stateCouncilregNumber: ['',Validators.required],
      qualificationname:['',Validators.required],
      
      });
  }
  getallDegree(){
    this.doctorservice.getDegree().subscribe(
      data => {
        this.degree =data;
        console.log( this.degree)
      }
     )
  }
  getallcollege(){
    this.doctorservice.getcollege().subscribe(
      data => {
       this.college=data;
       console.log(this.college)
      }
    )
  }
  getallCouncil(){
    this.doctorservice.getCouncil().subscribe(
      data =>{
        this.council =data;
        console.log(this.council)
      }
    )
  }
  get f() { return this.doctorForm.controls; }
  next(){
    this.submitted = true; 
    if(this.doctorForm.invalid)
    {
      return;

    }
    else if(this.doctorForm.valid)
    {
      this.doctorId=sessionStorage.getItem("editUserId");
      let req ={
        "doctorId":this.doctorId,
        "degreeId":this.doctormodel.degree,
        "collegeId":this.doctormodel.college,
        "councilId":this.doctormodel.stateCouncilName,
        "yearOfCompletion":this.doctormodel.yearOfcompletion,
        "experience":this.doctormodel.yearOfExperience,
        "councilReg":this.doctormodel.stateCouncilregNumber,
        "displayQualification":this.doctormodel.qualificationname
      }
      console.log(req)
      this.doctorservice.addQualification(req).subscribe(
        data => this.handlerSucess(data),
        error=>this.handelerError(error)
      )
    }
    
    
  }
  handlerSucess(data){
    console.log(data)
    this.toaster.success(' Qualification details added successfully');
    // this.router.navigate(['/add-photo']);
    this.router.navigate(['/add-timeslots']);
    // alert('data addedSucessfullly');
  }
  handelerError(error){
    this.error = error.error['error'];
    
    if(this.error == 'Missing Data')
    {
    }
    else  if(this.error == 'Same doctor with existing counsel registration number exist'){
      this.toaster.error('Some doctor with existing council registration number exist')
    }
  }
}
