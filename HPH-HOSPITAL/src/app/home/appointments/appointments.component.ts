import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AppointmentService } from './appointment.service';
import { Doctor } from 'src/app/_model/doctor';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  viewMode = 'tab1';
  public status = "CONFIRMED";
  public status1 = "PENDING";
  public status2 = "CANCELLED";
  page: number = 0;
  pendingPage: number = 0;
  cancelPage: number = 0;
  pages: Array<number>;
  results: any;
  pendingresults: Observable<Doctor[]>;
  canceledResults: Observable<Doctor[]>;

  HospitalId: any;
  messagesforPending: string;
  activeappoinmentsMessage: any;
  cancelledappoitmentmessage: any;


  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  displayedColumns = ['time', 'patname', 'date', 'dept', 'docname', 'status'];
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute, private appointmentService: AppointmentService) { }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.HospitalId = users['hospitalId'];
    this.confirmed();
  }

  confirmed() {
    console.log(this.status)
    this.appointmentService.getConfirmedAppointment(this.status, this.HospitalId, this.page).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }

  handlerSucess(data) {
    this.results = data['content'];
    this.dataSource.data = this.results;

    console.log(this.results)

    this.activeappoinmentsMessage = 'CONFIRMED APPOINTMENTS';
  }
  handlerError(error) {
    console.log(error)
    this.pages = null;
    this.activeappoinmentsMessage = 'NO CONFIRMED APPOINTMENTS';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  changePage(event) {
    console.log(event.pageIndex)
    this.appointmentService.getConfirmedAppointment(this.status, this.HospitalId, event.pageIndex).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
}
