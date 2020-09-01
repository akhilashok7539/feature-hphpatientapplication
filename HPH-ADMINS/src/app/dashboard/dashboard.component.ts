import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { HospitalService } from '../hospital/hospital.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    
  };
  public pieChartLabels: Label[] = ['IP', 'OP', 'SURGERY'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  Doctorscount: any;
  patientCount: any;
  completedAppointmentscount: any;
  pendingCount: any;
  hospitalCount: any;
  IPcount: any;
  OPcount :any;
  surgeryCount: any;
  doctorsList: any;
  specialitylist: any = [];
  // public pieChartColors = ["#ff9900","#ff9900","#97bbcd","#97bbcd"]; 
  constructor(private hospitalservice:HospitalService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.getcountofpatientsandhospital();
    this.getTop5doctos();
    this.getTop5speciality();
  }
 getcountofpatientsandhospital(){
  this.hospitalservice.getcount().subscribe(
    data =>{
      console.log(data)
      this.Doctorscount = data['doctorCount'];
      // console.log(this.Doctorscount)
      this.patientCount = data['patientCount'];
      this.completedAppointmentscount = data['appointmentCompletedCount'];
      this.pendingCount = data['appointmentPendingCount'];
      this.hospitalCount = data['acitveHospitalCount'];
      this.IPcount = data['appointmentIPCount'];
      this.OPcount = data['appointmentOPCount'];
      this.surgeryCount = data['appointmentSurgeryCount'];
      this.pieChartData = [this.IPcount, this.OPcount,this.surgeryCount ];
      console.log(this.pieChartData)
    },
    error =>{
      this.patientCount = 0;
      this.completedAppointmentscount = 0;
      this.Doctorscount = 0;
      this.hospitalCount= 0;
      this.pendingCount = 0;
      this.surgeryCount = 0;
      this.OPcount = 0;
      this.IPcount = 0;
    }
  )
 }
 getTop5doctos(){
   this.hospitalservice.gettop5doc().subscribe(
     data =>{
       console.log(data)
       this.doctorsList = data;
     },
     error =>{
      this.doctorsList = [];
     }
   )
 }
 getTop5speciality(){
  this.hospitalservice.getTop5speciality().subscribe(
    data =>{
      this.specialitylist = data;
      console.log(  this.specialitylist)

    },
    error =>{
     this.doctorsList = [];
    }
  )
 }
}
