import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-confirmed-appointments',
  templateUrl: './confirmed-appointments.component.html',
  styleUrls: ['./confirmed-appointments.component.css']
})
export class ConfirmedAppointmentsComponent implements OnInit {
  displayedColumns = ['patientId', 'patientName','date','time','department','docname','phoneNumber','status','complete'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
  }

}
