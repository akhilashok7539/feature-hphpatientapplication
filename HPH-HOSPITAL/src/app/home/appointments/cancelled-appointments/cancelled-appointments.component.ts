import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-cancelled-appointments',
  templateUrl: './cancelled-appointments.component.html',
  styleUrls: ['./cancelled-appointments.component.css']
})
export class CancelledAppointmentsComponent implements OnInit {
  public status = "CONFIRMED";
  public status1 = "PENDING";
  public status2 = "CANCELLED";
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  displayedColumns = ['time', 'patname', 'date', 'dept', 'docname', 'status'];
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  HospitalId: any;
  canceledResults: any;
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.getallcancelledappointmets();
  }
  getallcancelledappointmets() {
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.HospitalId = users['hospitalId'];
    this.appointmentService.getCanceledAppointments(this.status2, this.HospitalId, this.pageIndex).subscribe(
      data => this.handlerSucess2(data),
      error => this.handlerError2(error)
    )
  }
  handlerSucess2(data) {
    this.canceledResults = data['content'];
    this.dataSource.data = this.canceledResults;

  }
  handlerError2(error) {
    this.dataSource = new MatTableDataSource();

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  changePage(event) {
    console.log(event.pageIndex)
    this.appointmentService.getCanceledAppointments(this.status2, this.HospitalId, event.pageIndex).subscribe(
      data => this.handlerSucess2(data),
      error => this.handlerError2(error)
    )
  }

}
