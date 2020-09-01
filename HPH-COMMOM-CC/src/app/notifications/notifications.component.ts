import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../home/patient.service';
import { Observable } from 'rxjs';
import { Patient } from '../_model/patient';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
docLeaveDetails:Observable<Patient>;
  constructor(private router:Router,private patientService:PatientService) { }

  ngOnInit() {
    this.patientService.getAllLeave().subscribe(
      data => this.handlerSucessData(data),
      error => this.handlerError(error)
    )

  }
  handlerSucessData(data){
// console.log(data)
  this.docLeaveDetails = data;
  }
  handlerError(error){

  }
  viewPatients(docLeave:Patient){
    sessionStorage.setItem("editUserId", docLeave.doctor.doctorId.toString());
    sessionStorage.setItem("date",docLeave.date.toString());
    sessionStorage.setItem("time",docLeave.time.toString());
    console.log(sessionStorage)
    this.router.navigate(['/view-doc-patients']);
  }
}
