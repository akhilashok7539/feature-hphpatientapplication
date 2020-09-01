import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor/doctor.service';
@Component({
  selector: 'app-update-symptoms',
  templateUrl: './update-symptoms.component.html',
  styleUrls: ['./update-symptoms.component.css']
})
export class UpdateSymptomsComponent implements OnInit {
  results: any;
  symptoms :FormGroup;

  doctorsymptoms =[];
  value: any;
  doctorId: string;
  completeprofile = 'Complete Profile';
  isLoading = false;
  doctordetails: any;
  doctorIdArray = [];
  constructor(private doctorservice:DoctorService,private formBuilder: FormBuilder,private router:Router,
    private toaster:ToastrService) { }

  ngOnInit() {
    this.doctorId=JSON.parse(localStorage.getItem("currentuserId"));
    console.log(this.doctorId)
    this.getallSymptoms();
    this.symptoms = this.formBuilder.group({
      useremail: this.formBuilder.array([]),
      check:['',Validators.required]
    });
  }
  getallSymptoms()
  {
    this.doctorservice.getAllSymptoms().subscribe(
      data =>{
        this.results = data;
        console.log(this.results)
      },
      error =>{

      }
    )
  }
  onChange(time: string, isChecked: boolean) {
    this.doctorsymptoms =[];
    const emailFormArray = <FormArray>this.symptoms.controls.useremail;
    if (isChecked) 
    {
      emailFormArray.push(new FormControl(time));
      this.value = emailFormArray['value']
      //console.log(this.value)

      for(let j=0;j<this.value.length;j++){
          this.doctorsymptoms.push( this.value[j]);

      }
      console.log(this.doctorsymptoms)

      
      
  
    } 

    else 
    {
      let index = emailFormArray.controls.findIndex(x => x.value == time)
      emailFormArray.removeAt(index);
    }


    // console.log(emailFormArray)
   }
   next(){
    this.isLoading = true;
    this.completeprofile = 'Processing';
     console.log('hi')
    let req = [];
    
    for(let j=0;j<this.doctorsymptoms.length;j++){
      req.push( 
        {
       "doctorId":this.doctorId,
       "sicknessId":this.doctorsymptoms[j]
        }
       )
     } 
     console.log(req)
     this.doctorservice.addSymptoms(req).subscribe(
       data =>{
        this.completealdoctor();
       },
       error =>{

       }
     )
   }

   completealdoctor(){
    this.isLoading = true;
    this.completeprofile = 'Processing';
     this.doctordetails = JSON.parse(localStorage.getItem('currentdoctor'));
     for(let i = 0;i<this.doctordetails.length;i++)
     {
      this.doctorIdArray.push(
        {
          "doctorId" : this.doctordetails[i].doctorId
        }
      )
     }
     this.doctorservice.getapproveHopsitals(this.doctorIdArray).subscribe(
      data => this.handlerSuess(data),
      error =>this.handlerError(error)
    )
   }
   


  changeStatus(){
    this.isLoading = true;
    this.completeprofile = 'Processing';

    this.doctorId=JSON.parse(localStorage.getItem("currentuserId"));
    console.log(this.doctorId)
    this.doctorservice.getapprovebyadmin(this.doctorId).subscribe(
      data => this.handlerSuess(data),
      error =>this.handlerError(error)
    )
  }
  handlerSuess(data){
    this.isLoading = false;
    this.completeprofile = 'Complete Profile';

    this.toaster.success('Doctor Profile is successfully completed. Login credentials mail to the registered mail ID')
    this.router.navigate(['/view']);
  }
  handlerError(error){
    this.isLoading = false;
    this.completeprofile = 'Complete Profile';

  }
}
