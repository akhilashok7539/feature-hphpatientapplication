import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../doctor/doctor.service';

@Component({
  selector: 'app-doc-timeing-and-appointments',
  templateUrl: './doc-timeing-and-appointments.component.html',
  styleUrls: ['./doc-timeing-and-appointments.component.css']
})
export class DocTimeingAndAppointmentsComponent implements OnInit {
  appoinmentsBydate = false;
  doctorId: any;
  timeSlotes:any=[];
  mapdata;
  mapdatas;
  selectedDate;
  time: any;
  selectedTime = [];
  appointments: any;
  appointmentsmessage: string;

  constructor(private doctorservice:DoctorService) { }

  ngOnInit() {
    this.selectedDate = '';
    this.doctorId = JSON.parse(sessionStorage.getItem('DoctorIdLeave'));
    this.doctorservice.getallAvalibaletimslots(this.doctorId).subscribe(
      data =>{
        this.timeSlotes = data;
        this.mapdata = this.timeSlotes.map;
        console.log(this.mapdata)


      },
      error =>{

      }
    )
  }
  dateselected(){
    this.appoinmentsBydate = false;

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
  viewAppointments(selectedDate){
    console.log(selectedDate)
    
    this.appoinmentsBydate = true;
    this.doctorservice.getallappointments(selectedDate,this.doctorId).subscribe(
      data =>{
        console.log(data)
        window.scrollTo(0,200);
        this.appointments = data['content']
      },
      error =>{
        this.appointments = null;
        window.scrollTo(0,200);
        this.appointmentsmessage = 'No appointments Found'
      }
    )

  }
}
