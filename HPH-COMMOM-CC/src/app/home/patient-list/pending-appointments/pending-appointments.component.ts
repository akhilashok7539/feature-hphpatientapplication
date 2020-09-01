import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PatientService } from '../../patient.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmComponent } from '../../confirm/confirm.component';

@Component({
  selector: 'app-pending-appointments',
  templateUrl: './pending-appointments.component.html',
  styleUrls: ['./pending-appointments.component.css']
})
export class PendingAppointmentsComponent implements OnInit {
  displayedColumns = ['patientId', 'patientName', 'date', 'time', 'department', 'docname', 'phoneNumber', 'status', 'complete', 'cancel'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  results: any;
  errors: any;
  ccId: any;
  status = 'FIRST_CALL_CONFIRMED';

  constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute, private patientService: PatientService,
    private toaster: ToastrService,
    private _router: Router) {

  }
  ngOnInit() {
    this.getPatientlist();
    this.patientService.refresh$.subscribe(
      () => {
        this.getPatientlist();
      });

  }
  getPatientlist() {
    // this.patientService.getpatientByDoctor(this.pageIndex).subscribe(
    //   data => this.handlerSucessData(data),
    //   error => this.handlerErrordata(error)
    // );
  }
  handlerSucessData(data) {
    this.results = data['content'];
    console.log(this.results)
    this.dataSource.data = this.results;


  }
  handlerErrordata(error) {
    this.dataSource = new MatTableDataSource();

    console.log('error')
    this.errors = error.error['error'];
    if (this.errors == 'No data found') {
      this.results = [];
    }
   
  }
  openDialog(bookingId): void {
    //console.log(bookingId)
    const dialogRef = this.dialog.open(ConfirmComponent, {
      // width: '400px'
      data: bookingId

      // height:'300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.patientService.getpatientByDoctor(this.page);
      console.log('The dialog was closed');

    });
  }

  confirm(res) {
    const users = JSON.parse(localStorage.getItem('currentCc'));
    this.ccId = users['ccId'];
    console.log(this.ccId)
    sessionStorage.setItem("bookId", res.bookingId.toString());
    console.log(sessionStorage)
    let bookingId = sessionStorage.getItem("bookId");
    console.log(bookingId)
    let req = {

    }
    this.patientService.appointmentConfirm(this.ccId, bookingId, req, this.status).subscribe(
      data => this.handlerDataConfirm(data),
      error => this.handlerDataConfirmError(error)
    )
  }
  handlerDataConfirm(data) {
    this.ngOnInit();
    // this.patientService.getpatientByDoctor(this.page);
    // window.location.reload();
    this.toaster.success('Appointment confirmed successfully');

  }
  handlerDataConfirmError(error) {
    this.toaster.error('There are too many request,please wait for some time');
  }

}
