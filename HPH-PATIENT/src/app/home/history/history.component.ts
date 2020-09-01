import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointments/appointment.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  appointmentHistory:any = [];
  patientId: string;
  apiUrl: any;
  constructor(private appointmentservice:AppointmentService) { }

  ngOnInit() {
    this.getHistory();
    this.apiUrl = environment.apiUrl;

  }
  getHistory() {
    this.patientId =  localStorage.getItem('currentPatientid');
    console.log(this.patientId)
    this.appointmentservice.getHistory(this.patientId).subscribe(
      data => {
        this.appointmentHistory = data;
        console.log(this.appointmentHistory);
      }
    )
  }
}
