import { Component, OnInit, ɵConsole, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/_model/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor/doctor.service';
@Component({
  selector: 'app-update-qualifcation-details',
  templateUrl: './update-qualifcation-details.component.html',
  styleUrls: ['./update-qualifcation-details.component.css']
})
export class UpdateQualifcationDetailsComponent implements OnInit {
  @Output() nextClickqualification = new EventEmitter();
  degree :any;
  college:any;
  council:any;

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
  submitted = false;
  public doctormodel:Doctor;
  constructor(private router:Router,private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private _router: Router,private doctorservice:DoctorService) {

      this.doctormodel =new Doctor();
     }
 
     

  ngOnInit() {

    // this.dataservice.currentUserId.subscribe(userId =>this.doctorId = userId);
    // console.log(this.doctorId)
    this.doctorId=JSON.parse(localStorage.getItem("currentuserId"));
    console.log(this.doctorId)
    
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
  }
  get f() { return this.doctorForm.controls; }
  nextRoutes(){
    this.nextClickqualification.emit();
  }
  next(){
    this.submitted = true; 
    this.doctorId=JSON.parse(localStorage.getItem("currentuserId"));
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
    this.doctorservice.updateQualification(req).subscribe(
      data => this.handlerSucess(data),
      error=>this.handelerError(error)
    )
    // this.router.navigate(['/addTiming']);
    
  }
  handlerSucess(data){
    console.log(data)
    // this.router.navigate(['/addTiming']);
    this.toaster.success(' Qualification details added successfully');
    this.nextRoutes();
    // this.router.navigate(['/add-photo']);
    
    // alert('data addedSucessfullly');

  }
  handelerError(error){
    //this.toaster.error('unable to add')
    // alert('unable to add data');
  }
}
