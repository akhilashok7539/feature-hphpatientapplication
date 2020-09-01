import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
   pages:Array<any>;
   page:number=0;
  appointments: any;
  appointmentmessage: string;
  date: string;
  constructor(private datePipe:DatePipe,private doctorservice:DoctorService) { }

  ngOnInit() {
    var data = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    console.log(data);
    this.date = data;
    let userId = localStorage.getItem("currentuserId");

    this.doctorservice.getappointments(this.page,data,userId).subscribe(
      data => this.handlersucess(data),
      error => this.handlerError(error)
    )
  }
  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.ngOnInit();
  }
  handlersucess(data){
    console.log(data)
    this.appointments=data['content'];
    this.pages =  new Array(data['totalPages']);
    console.log(this.appointments)
  }
  handlerError(error){
    console.log(error)
    this.appointments = null;
    this.pages = null;
    this.appointmentmessage = 'No appointments found';
  }
}
