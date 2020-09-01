import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-pending-appointments',
  templateUrl: './pending-appointments.component.html',
  styleUrls: ['./pending-appointments.component.css']
})
export class PendingAppointmentsComponent implements OnInit {
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
  pendingresults: any;
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.HospitalId = users['hospitalId'];
    this.appointmentService.getPendingAppointments(this.status1, this.HospitalId, this.pageIndex).subscribe(
      data => this.handlerSucess1(data),
      error => this.handlerError1(error)
    )
  }
  handlerSucess1(data) {
    this.pendingresults = data['content'];
    this.dataSource.data = this.pendingresults;

  }
  handlerError1(error) {
    this.dataSource = new MatTableDataSource();

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  changePage(event){
    console.log(event.pageIndex)

    this.appointmentService.getPendingAppointments(this.status1, this.HospitalId,event.pageIndex).subscribe(
      data => this.handlerSucess1(data),
      error => this.handlerError1(error)
    )
  }
}
