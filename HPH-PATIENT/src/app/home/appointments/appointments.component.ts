import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from '../bookanappointment/booking.service';
import { SearchService } from '../bookanappointment/search.service';
import { AppointmentService } from './appointment.service';
import { environment } from 'src/environments/environment.prod';
import { RescheduleAppointmentComponent } from './reschedule-appointment/reschedule-appointment.component';
import { CancelAppointmentComponent } from './cancel-appointment/cancel-appointment.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any;
  patientId: any;
  firstname: any;
  doctorId: any;
  bookingId: any;
  appointmentHistory: any;
  apiUrl: string;
  errors: any;
  p: any;
  constructor(public dialog: MatDialog, private bookingservice: BookingService,
    private searchservice: SearchService, private appointmentservice: AppointmentService) { }

  ngOnInit() {
    this.apiUrl = environment.apiUrl;
    window.scrollTo(0, 0)
    localStorage.getItem('currentPatientid');
    this.patientId =  localStorage.getItem('currentPatientid');
    console.log(this.patientId)

    this.bookingservice.refresh$.subscribe(
      () => {
        this.getAppointments();
      });
    this.getAppointments();
    // this.searchservice.getAppointments(this.patientId).subscribe(
    //   data => {
    //     this.appointments = data;
    //     console.log(this.appointments)
    //   }
    // )
  }
  reschedule(doctorId, bookingId): void {
    const dialogRef = this.dialog.open(RescheduleAppointmentComponent, {
      data: {
        doctorId, bookingId,
        height: '380px',

      }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  cancel(appointment): void {
    const dialogRef = this.dialog.open(CancelAppointmentComponent, {
      data: {
        appointment
      }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // reschedule() {
  // }
  getAppointments() {
    this.appointmentservice.getCurrentAppointments(this.patientId).subscribe(
      data => {
        this.appointments = data;
        console.log(this.appointments)
      },
      error => {
        console.log('error')
        this.errors = error.error['error'];
        if (this.errors == 'No data found') {
          this.appointments = [];
        }

      }
    )
  }
  getHistory() {
    this.appointmentservice.getHistory(this.patientId).subscribe(
      data => {
        this.appointmentHistory = data;
        console.log(this.appointmentHistory);
      }
    )
  }
}
