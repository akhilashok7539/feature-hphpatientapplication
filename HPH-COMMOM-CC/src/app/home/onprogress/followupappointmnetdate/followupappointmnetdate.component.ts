import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../patient.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-followupappointmnetdate',
  templateUrl: './followupappointmnetdate.component.html',
  styleUrls: ['./followupappointmnetdate.component.css']
})
export class FollowupappointmnetdateComponent implements OnInit {
  doctorId: any;
  mapdata;
  mapdatas;
  timeSlotes: any = [];
  selectedDate: any = '';
  selectedtimesolts: any = '';
  bookingForm: FormGroup;
  selectedTime = [];
  time: any;
  followUpId: any;

  constructor(private activaterouter: ActivatedRoute, private formBuilder: FormBuilder,private router:Router,
    private PatientService: PatientService,private toaster:ToastrService) { }

  ngOnInit() {
    this.activaterouter.params.subscribe(params => {
      console.log(params)
      this.doctorId = params.doctor;
      this.followUpId = params.followup;
    })
    this.bookingForm = this.formBuilder.group({
      patientId: [],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
    this.getDoctorTimeslots();
  }
  getDoctorTimeslots() {
    this.PatientService.getTimeslots(this.doctorId).subscribe(
      data => {
        this.timeSlotes = data;

        this.mapdata = this.timeSlotes.map;
        console.log(this.mapdata)
      },
      error => {

      }
    )
  }
  dateselected() {
    this.selectedTime = [];
    this.mapdatas = this.timeSlotes.map[this.selectedDate];
    console.log(this.mapdatas)
    console.log(this.mapdatas.length)
    for (let i = 0; i < this.mapdatas.length; i++) {
      this.time = this.mapdatas[i];
      this.selectedtime(this.time);
    }
  }
  selectedtime(time) {
    this.selectedTime.push({
      'timing': time
    });
    console.log(this.selectedTime)
  }
  Submit(){
    if(this.bookingForm.invalid)
    {
      this.toaster.error('Please choose date and time solts');
      return;
    }else if(this.bookingForm.valid)
    {

    }
    let req ={
      "followupBookingId":this.followUpId,
      "date":this.selectedDate,
      "time":this.selectedtimesolts
    }
    console.log(req)
    this.PatientService.addFollow(req).subscribe(
      data =>{
        this.toaster.success('Follow up added successfully');
        this.router.navigate(['/onprogress']);
      },
      error =>{
        this.toaster.error('We are busy at this moment...please try again after some time');
      }
    )
  }
}
