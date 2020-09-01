import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-completed-appointments',
  templateUrl: './completed-appointments.component.html',
  styleUrls: ['./completed-appointments.component.css']
})
export class CompletedAppointmentsComponent implements OnInit {
  displayedColumns = ['patientId', 'patientName','date','time','department','docname','phoneNumber','status','complete'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort ,{static:true}) sort: MatSort;
  constructor() { }

  ngOnInit() {
  }

}
