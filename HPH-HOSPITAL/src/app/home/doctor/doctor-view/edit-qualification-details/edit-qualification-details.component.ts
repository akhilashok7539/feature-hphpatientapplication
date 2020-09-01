import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/_model/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-edit-qualification-details',
  templateUrl: './edit-qualification-details.component.html',
  styleUrls: ['./edit-qualification-details.component.css']
})
export class EditQualificationDetailsComponent implements OnInit {
  view = false;

  degree :any;
  college:any;
  council:any;
  submitted = false;

  loading: boolean;
  //hospitalId=60001;
  speciality = [];
  city =[];
  profileId=4;
  doctorDetails =[];
  uId:any;
  public doctor:Doctor;
  doctorId:any;
  doctorForm :FormGroup;
  public doctormodel:Doctor;
  constructor(private router:Router,private formBuilder: FormBuilder,
    private toaster:ToastrService, 
    private _activatedRoute:ActivatedRoute,
    private _router: Router,private doctorservice:DoctorService) {

      this.doctormodel =new Doctor();
     }

  ngOnInit() {
    let userId = sessionStorage.getItem("editUserId");
    this.doctorservice.getDegree().subscribe(
    data => {
      this.degree =data;
      console.log( this.degree)
    }
   )

   this.doctorservice.getcollege().subscribe(
     data => {
      this.college=data;
      console.log(this.college)
     }
   )

   this.doctorservice.getCouncil().subscribe(
     data =>{
       this.council =data;
       console.log(this.council)
     }
   )
   this.doctorForm = this.formBuilder.group({
  
    degree:['',Validators.required],
    college: ['',Validators.required],
    stateCouncilName: ['',Validators.required],
    yearOfcompletion: ['',Validators.required],
    yearOfExperience: ['',Validators.required],
    stateCouncilregNumber: ['',Validators.required],
    qualificationname: ['',Validators.required],
    
    });
    this.doctorForm.disable();

  this.viewdoctorDegree(+userId);
  }
  get f() { return this.doctorForm.controls; }

  edit(){
    this.view = true;
    this.doctorForm.enable();
  }
  viewdoctorDegree(userId){
    this.doctorservice.getDocDegreeById(userId).subscribe(
      data =>this.handleSuccess(data) 
      // this.doctorForm.setValue(data);
      // console.log(this.doctorForm)
  
    );
  }
  handleSuccess(data){
    console.log(data);
    console.log("success");

    if(data === null){
      this.doctormodel.degree = null;
      this.doctormodel.yearOfcompletion=null;
      this.doctormodel.stateCouncilName=null;
      this.doctormodel.college=null;
      this.doctormodel.yearOfExperience=null;
      this.doctormodel.stateCouncilregNumber=null;
      console.log(this.doctormodel)
    }
    else
    {
      this.doctormodel= data;
      this.doctormodel.degree = this.doctormodel.degree['degreeId'];
      this.doctormodel.yearOfcompletion = this.doctormodel['yearOfCompletion'];
      this.doctormodel.stateCouncilName = this.doctormodel.council['councilId'];
      this.doctormodel.college = this.doctormodel.college['collegeId'];
      this.doctormodel.yearOfExperience = this.doctormodel['experience'];
      this.doctormodel.stateCouncilregNumber = this.doctormodel['councilReg'];
      this.doctormodel.qualificationname = this.doctormodel['displayDegree'];

    }
   
  }
  
  next(){
    let userId = sessionStorage.getItem("editUserId");
    parseInt(userId)
    this.submitted = true;

    console.log('put')
    let req ={
      "doctorId":parseInt(userId),
      "degreeId":this.doctormodel.degree,
      "collegeId":this.doctormodel.college,
      "councilId":this.doctormodel.stateCouncilName,
      "yearOfCompletion":this.doctormodel.yearOfcompletion,
      "experience":this.doctormodel.yearOfExperience,
      "councilReg":this.doctormodel.stateCouncilregNumber,
      "displayQualification":this.doctormodel.qualificationname
    }
    console.log(req)
    this.doctorservice.updateQualification(req).subscribe(
      data => this.handlerSucess(data),
      error=>this.handelerError(error)
    )
  
   
    // this.router.navigate(['/addTiming']);
    
  }
  handlerSucess(data){
    console.log(data)
    this.doctorForm.disable();
    this.view =false;
    this.toaster.success(' Qualification details updated successfully');
    // this.router.navigate(['/update-doctorMediIdProof']);
    // alert('data addedSucessfullly');
  
    // {path:'update-doctorMediIdProof',component:UpdateDoctorMediRegProofComponent},
 
  }
  handelerError(error){
    // alert('unable to add data');
    this.toaster.error('Unable to Update Qualification');
  }


}
