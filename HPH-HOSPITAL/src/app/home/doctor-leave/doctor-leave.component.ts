import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor/doctor.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-doctor-leave',
  templateUrl: './doctor-leave.component.html',
  styleUrls: ['./doctor-leave.component.css']
})
export class DoctorLeaveComponent implements OnInit {
  // timelsots = false;
  // appoinmentsBydate = false;

  Request = '';

  doctorId: any;
  doctors: any;
  dateSelected: any;
  hospitalId: any;
  docLeaveDetails: any;
  displayedColumns = ['name', 'dept', 'date', 'reason','status','timeslots','approve','reject'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private datePipe: DatePipe, private toaster: ToastrService,
    private router: Router, private doctorservice: DoctorService) { }

  ngOnInit() {
    var data = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    this.dateSelected = data;
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalId = users['hospitalId'];

    this.doctorservice.getLeaveByDate(data, this.hospitalId).subscribe(
      data => {
        this.docLeaveDetails = data;
        this.dataSource.data = this.docLeaveDetails;
        console.log(this.docLeaveDetails)
      },
      error => {
        this.dataSource = new MatTableDataSource();

      }
    )
  }
  addLeave() {
    this.router.navigate(['/add-leave']);

  }
  click(person) {
    console.log(person.doctor.doctorId)
    this.doctorId = person.doctor.doctorId;
    sessionStorage.setItem('DoctorIdLeave', JSON.stringify(this.doctorId))
    // this.timelsots = true;
    this.router.navigate(['/doc-timming-appoitnmetns']);
  }
  viewAppointments() {
    // this.appoinmentsBydate = true;
  }
  getLeaveBydate(date) {
    console.log(date)
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalId = users['hospitalId'];

    this.doctorservice.getLeaveByDate(date, this.hospitalId).subscribe(
      data => {
        this.docLeaveDetails = data;
        this.dataSource.data = this.docLeaveDetails;

        console.log(this.docLeaveDetails)
      },
      error => {
        this.dataSource = new MatTableDataSource();

      }
    )

  }
  approve(person) {
    console.log(person.leaveId)
    this.Request = 'Request Approving....';
    let req = {}
    this.doctorservice.approveleaveRequest(person.leaveId, req).subscribe(
      data => {
        this.toaster.success('Leave Request Approved');
        this.Request = '';
        this.ngOnInit();
      },
      error => {
        this.Request = '';
      }
    )
  }
  reject(person) {
    this.Request = 'Request Rejecting....';
    let req = {}
    this.doctorservice.rejectleaveRequest(person.leaveId, req).subscribe(
      data => {
        this.toaster.success('Leave Request Rejected');
        this.Request = '';
        this.ngOnInit();
      },
      error => {
        this.Request = '';
      }
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
}
