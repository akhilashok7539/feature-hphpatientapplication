import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../doctor/doctor.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Doctor } from 'src/app/_model/doctor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-doc-leave',
  templateUrl: './add-doc-leave.component.html',
  styleUrls: ['./add-doc-leave.component.css']
})
export class AddDocLeaveComponent implements OnInit {
  doctors=[];
  leaveForm :FormGroup;
  public doctorModel:Doctor;
  timeSlotes: any;
  timming: any[];
  value: any;
  ishospital = true;
  doctorSelected;
  constructor(private router:Router,private formBuilder: FormBuilder,private toaster:ToastrService,
    private doctorservice:DoctorService)
   {
    this.doctorModel = new Doctor();
    }

  ngOnInit() {
    this.doctorSelected = '';
    this.alldoctors();
    this.leaveForm = this.formBuilder.group({
      useremail: this.formBuilder.array([]),
      date:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      reason:['',Validators.required],
    });
  }
  
  alldoctors()
  {
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    const userId = users['hospitalId'];
    this.doctorservice.getdoctorsByactive(userId).subscribe(
      data=>{
        this.doctors = data;
        console.log(this.doctors)
      }
    )
  }
  getDocTimeSlots(doctorSelected){
    // this.categoryitems  =[];
    this.timeSlotes = null;
    this.doctorSelected = doctorSelected;
    console.log(this.doctorSelected);

    this.doctorservice.getAllsessions(doctorSelected).subscribe(
      data =>{
        this.timeSlotes = data;
        console.log(this.timeSlotes)
      }
    )
 }
  onChange(time: string, isChecked: boolean) {
    this.timming =[];
    const emailFormArray = <FormArray>this.leaveForm.controls.useremail;
    if (isChecked) 
    {
      emailFormArray.push(new FormControl(time));
      this.value = emailFormArray['value']
      //console.log(this.value)

      for(let j=0;j<this.value.length;j++){
          this.timming.push( this.value[j]);

      }
      console.log(this.timming)

      
      
  
    } 

    else 
    {
      let index = emailFormArray.controls.findIndex(x => x.value == time)
      emailFormArray.removeAt(index);
    }


    // console.log(emailFormArray)
   }

   addLeave(){
    let req = [];
    if(this.doctorSelected == null)
        {
          this.toaster.error("Please choose a doctor");
          return;

        }
      if(this.doctorModel.date == null)
        {
          this.toaster.error('Please choose a date');
          return;
        }
        
        if(this.timming == null)
        {
          this.toaster.error('Choose atleast one time slots');
          return;

        }
        if(this.doctorModel.reason == null)
        {
          this.toaster.error('Please enter a reason for leave');
          return;

        }
    for(let j=0;j<this.timming.length;j++){
      req.push( 
        {
      "date":this.doctorModel.date,
      "doctorId":this.doctorSelected,
      "timing":this.timming[j],
      "reason":this.doctorModel.reason,
      "isHospital":this.ishospital
        }
      )
    }
    console.log(req)
    this.doctorservice.addLeaveDoctor(req).subscribe(
      data =>{
        this.toaster.success('Doctor leave added successfully');
        this.router.navigate(['/doctorLeave']);
      },
      error =>{
        // if(this.doctorModel.date == null)
        // {
        //   this.toaster.error('Please choose a date');
        // }
        // if(this.doctorSelected == null)
        // {
        //   this.toaster.error("Please choose a doctor");
        // }
        // if(this.timming == null)
        // {
        //   this.toaster.error('Choose atleast one time slots');
        // }
        // if(this.doctorModel.reason == null)
        // {
        //   this.toaster.error('Please enter a reason for leave');
        // }
      
      }
    )
   }
  // getdatechange(startdate) {

    // console.log(startdate);
    // const addDays = (date, days = 1) => {
    //   const result = new Date(date);
    //   result.setDate(result.getDate() + days);
    //   return result;
    // };

    // const dateRange = (start, end, range = []) => {
    //   if (start > end) return range;
    //   const next = addDays(start, 1);
    //   return dateRange(next, end, [...range, start]);
    // };

    // const range = dateRange(new Date(this.startdate), new Date(this.enddate));

    // console.log(range.map(date => date.toISOString().slice(0, 10)));
        // }
}
