import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from '../../bookanappointment/booking.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SearchService } from '../../bookanappointment/search.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.css']
})
export class CancelAppointmentComponent implements OnInit {
  button = 'Cancel';
  doctorid: any;
  timeSlotes: any;
  bookingid: any;
  // cancelForm: FormGroup;
  slotId: any;
  bookingStatus = 'CANCELLED';
  profileId = 1;
  patientId: any;
  date: any;
  time: any;
  // button = "Cancel Appointment";
  isLoading = false;
  appointmentsDetail = []
  private showLoader: boolean = false;

  errors: any;
  constructor(@Inject(MAT_DIALOG_DATA) data, private bookingservice: BookingService,
   private dialogRef: MatDialogRef<CancelAppointmentComponent>,
  private _activatedRoute: ActivatedRoute, private _router: Router, private toastr: ToastrService,
  private searchservice: SearchService, private formBuilder: FormBuilder)
   {
     this.appointmentsDetail = data['appointment'];
     console.log(this.appointmentsDetail)
     
    }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('currentPatient'));
    this.patientId = users['patientId'];
  }
  cancel(){
    this.isLoading = true;
    this.button = "Processing";
    let req = {
      "profileId": this.appointmentsDetail['profileId'],
      "patientId": this.patientId,
      "doctorId":  this.appointmentsDetail['doctor'].doctorId,
      "date": this.appointmentsDetail['date'],
      "time": this.appointmentsDetail['time'],
      "bookingStatus": this.bookingStatus,
      "bookingId": this.appointmentsDetail['bookingId']
    }
    console.log(req)
    this.bookingservice.cancelAppointment(this.appointmentsDetail['bookingId'], req).subscribe(
      data => this.handleSuccessprofile(data),
      error => this.handleErrorprofile(error));

  }
  handleSuccessprofile(data) {
  
    this.isLoading = false;
    this.button = "Cancel";
    this.showLoader = false;
    this.dialogRef.close();
    // window.location.reload();
    // this._router.navigate(['/ProfileHome']);
    this.toastr.success('Your appointment cancelled successfully');
  }
  handleErrorprofile(error: HttpErrorResponse) {
    // this.dialogRef.close();
    this.isLoading = false;
    this.button = "Cancel Appointment";
    this.errors = error.error['error'];
    if (error.status === 400) {
      this.toastr.error('login and try again/server error');
    } else {
      //this.toastr.error(this.errors);
    }
  }
  close(){
    this.dialogRef.close();
  }
}
