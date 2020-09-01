import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Patient } from 'src/app/_models/patient';
import { Booking } from 'src/app/_models/booking';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../bookanappointment/search.service';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../bookanappointment/booking.service';

@Component({
  selector: 'app-reschedule-appointment',
  templateUrl: './reschedule-appointment.component.html',
  styleUrls: ['./reschedule-appointment.component.css']
})
export class RescheduleAppointmentComponent implements OnInit {
  mapdata;
  mapdatas;
  selectedDate;
  selectedTime = [];
  selectedtimesolts:any;
  doctorid: any;
  timeSlotes: any;
  bookingid: any;
  button = 'Reschedule';

  RescheduleForm: FormGroup;
  bookingStatus = 'PENDING';
  profileId = 1;
  patientId: any;
  date: any;
  time: any;
  private showLoader: boolean = false;
  public patientModel: Patient;
  isLoading = false;
  public bookingModel: Booking;
  messages: string;
  constructor(@Inject(MAT_DIALOG_DATA) data, private bookingservice: BookingService, private dialogRef: MatDialogRef<RescheduleAppointmentComponent>,
  private _activatedRoute: ActivatedRoute, private _router: Router, private toastr: ToastrService,
  private searchservice: SearchService, private formBuilder: FormBuilder) {
  this.doctorid = data.doctorId;
  this.bookingid = data.bookingId;
  console.log(this.doctorid);
  this.bookingservice.getTimeslots(this.doctorid).subscribe(
    data => {
      this.timeSlotes = data;
      this.mapdata = this.timeSlotes.map;
      console.log(this.mapdata)
      console.log(this.timeSlotes)
    },
    error => {
      this.messages = 'No TimeSlots Available For this Doctor';
    }
  )
  this.patientModel = new Patient();
  this.bookingModel = new Booking();
}
ngOnInit() {
  this.selectedDate ='';
  this.selectedtimesolts = '';

  this.RescheduleForm = this.formBuilder.group({
    patientId: [],
    date: ['', Validators.required],
    time: ['', Validators.required]
  });
  const users = JSON.parse(localStorage.getItem('currentPatient'));
  this.patientModel.patientId = users['patientId'];
}
dateselected(){
  this.selectedTime = [];
  this.mapdatas = this.timeSlotes.map[this.selectedDate];
  console.log(this.mapdatas)
  console.log(this.mapdatas.length)
  for(let i=0;i<this.mapdatas.length;i++){
    this.time = this.mapdatas[i];
    this.selectedtime(this.time);
  }
}
selectedtime(time){
  this.selectedTime.push({
    'timing':time
  });
  console.log(this.selectedTime)
}

cancel(){
    this.dialogRef.close();
}
reschedule() {
  this.isLoading = true;
  this.button = 'Processing';
  let req = {
    // "profileId":this.profileId,
    // "patientId":this.patientModel.patientId,
    "doctorId": this.doctorid,
    "date": this.selectedDate,
    "time": this.selectedtimesolts,
    "bookingStatus": this.bookingStatus,
    "bookingId": this.bookingid

  }
  console.log(req)
  this.bookingservice.rescheduleappointment(req).subscribe(
    data => this.handleSuccessprofile(data),
    error => this.handleErrorprofile(error));
}
handleSuccessprofile(data) {
  this.showLoader = false;
  this.dialogRef.close();
  //window.location.reload();
  // this._router.navigate(['/ProfileHome']);
  this.toastr.success('Your Appointment is rescheduled successfully');
}
handleErrorprofile(error: HttpErrorResponse) {
  this.button = 'Reschedule';
  this.isLoading = false
  if (error.status === 400) {
    this.toastr.error(' Please Choose appropriate date and time');
  }
  else if (error.status === 500) {
    this.toastr.error('Server error try again');
  }

}

}
