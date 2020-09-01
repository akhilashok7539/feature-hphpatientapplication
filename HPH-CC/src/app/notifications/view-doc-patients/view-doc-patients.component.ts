import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/home/patient.service';

@Component({
  selector: 'app-view-doc-patients',
  templateUrl: './view-doc-patients.component.html',
  styleUrls: ['./view-doc-patients.component.css']
})
export class ViewDocPatientsComponent implements OnInit {
results:any;
dates:any;
  times: string;
  constructor(private patientservice:PatientService) { 
    
  }

  ngOnInit() {
    let userId = sessionStorage.getItem("editUserId");
    let date = sessionStorage.getItem("date");
    let time = sessionStorage.getItem("time");
    // console.log(userId)
    this.patientservice.getpatientList(userId,date,time).subscribe(
      data => this.handlerSucess(data),
      error =>this.handlerError(error)
    )
  }
  
  handlerSucess(data){
    // console.log(data)
    this.results =data;
    
    // console.log(userId)
    let date = sessionStorage.getItem("date");
    let time = sessionStorage.getItem("time");
    this.dates= date;
    this.times = time;
    console.log(this.dates)
     sessionStorage.clear();
    console.log(sessionStorage)
  }
  handlerError(error){

  }
// cancel(){
//   let userId = sessionStorage.getItem("editUserId");
//   let date = sessionStorage.getItem("date");
//   let time = sessionStorage.getItem("time");
//   this.patientservice.cancelpatientappointment(userId,date,time).subscribe(
//     data => this.handlerSucess(data),
//     error =>this.handlerError(error)
//   )
// }

}
