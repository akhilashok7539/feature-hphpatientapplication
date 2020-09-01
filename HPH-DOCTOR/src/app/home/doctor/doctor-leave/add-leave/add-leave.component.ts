import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Leave } from 'src/app/_model/leave';
import { DoctorService } from '../../doctor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { runInThisContext } from 'vm';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent implements OnInit {
  leaveForm :FormGroup;
  public leaveModel:Leave;
  DoctorName: any;
  sessions: any;
  timming =[];
  value: any;

  constructor(private datePipe:DatePipe,private formbuilder:FormBuilder,private toaster:ToastrService,
    private doctorservice:DoctorService,private toasterservice:ToastrService,
    private router:Router) { }

  ngOnInit() {
    let userId = JSON.parse(localStorage.getItem('currentuserId'));

    this.leaveModel = new Leave();
    this.leaveForm = this.formbuilder.group({
      timseslotssessions: this.formbuilder.array([]),


      doctorName:['',Validators.required],
      startDate:['',Validators.required],
      // endDate:['',Validators.required],
      reason:['',Validators.required],
      checkedvalue:['',Validators.required],

    });
    this.DoctorName = JSON.parse(localStorage.getItem('currentdoctor'));
    this.leaveModel.doctorName = this.DoctorName['0'].firstName;
    // this.leaveModel.startDate = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.getallsession();
  }

  getallsession(){
    let userId = JSON.parse(localStorage.getItem('currentuserId'));

    this.doctorservice.getAllsessions(userId).subscribe(
      data =>{
        this.sessions = data;
        console.log(this.sessions)
      },
      error =>{

      }
    )
  }
 
  onChange(time: string, isChecked: boolean) {
    this.timming =[];
    const emailFormArray = <FormArray>this.leaveForm.controls.timseslotssessions;
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
   submit()
   {
 
    let userId = JSON.parse(localStorage.getItem('currentuserId'));
    let req = [];
    for(let j=0;j<this.timming.length;j++){
      req.push( 
        {
       "date":this.leaveModel.startDate,
       "doctorId":userId,
       "timing":this.timming[j],
       "reason":this.leaveModel.reason
        }
       )
     } 
     this.doctorservice.addNewLeave(req).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    ) 
   }
   handlerSucess(data){
    console.log(data)
    this.router.navigate(['/doctor-leave']);
    this.toaster.success('Leave added successfully');
  }
  handlerError(error){
   if(this.leaveModel.reason == null){
     this.toaster.error('Please fill the details')
   }
  else if(this.leaveModel.startDate == null){
     this.toaster.error('Please select date');
   }
   else if(error.error['error']== 'Missing Data')
   {
    this.toaster.error('Please choose atleast one timeslots');
   }
 
  }
  getalldate()
  {
    var day = 1000*60*60*24;
    // let date1 = new Date('2013-07-30');
    // let date2 = new Date("2013-08-04");

    let date1 = new Date('this.leaveModel.startDate');
    let date2 = new Date('this.leaveModel.endDate');
    var diff = (date2.getTime()- date1.getTime())/day;
    let arr =[];
    for(var i=0;i<=diff; i++)
    {
       var xx = date1.getTime()+day*i;
       var yy = new Date(xx);
      arr.push(yy.getFullYear()+"-"+(yy.getMonth()+1)+"-"+yy.getDate())
       console.log(yy.getFullYear()+"-"+(yy.getMonth()+1)+"-"+yy.getDate());
    }
    console.log(arr)
  }
}
