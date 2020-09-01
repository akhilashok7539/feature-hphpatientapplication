import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppointmentService } from './appointment.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  doctorid: any;
  pages: Array<any>;
  page: number = 0;
  hospitalId :any;
  appointments: any;
  appointmentmessage: string;
  date: string;
  displayedColumns = ['patientname', 'time','date','docname','status'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private activaterouter: ActivatedRoute, private datepipe: DatePipe, private appointmentservice: AppointmentService) { }

  ngOnInit() {
    this.activaterouter.params.subscribe(params =>{
      console.log(params.id)
      this.hospitalId = params.id;
    })
    this.appointmentservice.getappointmentsbyid(this.hospitalId).subscribe(
      data =>{
        this.appointments = data['content'];
        this.dataSource.data = this.appointments;
      },
      error =>{
        this.dataSource = new MatTableDataSource();

        this.appointmentmessage = 'No appointments found';
      }
    )
  }
  changePage(event) {
    console.log(event.pageIndex)
    this.appointmentservice.getappointmentsbyid(event.pageIndex).subscribe(
      data =>{
        this.appointments = data['content'];
        this.dataSource.data = this.appointments;
      },
      error =>{
        this.dataSource = new MatTableDataSource();
        this.appointmentmessage = 'No appointments found';
      }
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;


  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  // setPage(i, event: any) {
  //   event.preventDefault();
  //   this.page = i;
  //   this.ngOnInit();
  // }
  // handlersucess(data) {
  //   console.log(data)
  //   this.appointments = data['content'];
  //   this.pages = new Array(data['totalPages']);
  //   console.log(this.appointments)
  // }
  // handlerError(error) {
  //   console.log(error)
  //   this.appointments = null;
  //   this.pages = null;
  //   this.appointmentmessage = 'No appointments found';
  // }
}
