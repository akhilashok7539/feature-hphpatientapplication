import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../home/patient.service';
import { Patient } from '../_model/patient';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  status = 'COMPLETED';
  status2 = 'CANCELLED';
  public ccid;
  page: number = 0;
  pages: Array<any>;
  results: any;
  pendingresults: Observable<Patient[]>;
  canceledResults: Observable<Patient[]>;
  appointments: any;
  result: any;
  confirmed: any;
  search:any;
  searchString: string;
  displayedColumns = ['BookingId','patientId', 'patientName', 'date', 'time', 'department', 'docname', 'phoneNumber'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private router: Router, private patientService: PatientService) { }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('currentCc'));
    this.ccid = users['ccId'];
    this.appointConfirm();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


  }

  appointConfirm() {
    console.log(this.page)
    this.patientService.getPatientByconfirmed().subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error))
  }
  handlerSucess(data) {
    this.dataSource.data = data;
    this.totalLength =data.length;
  }
  handlerError(error) {
    // this.confirmed = null;
    this.pages = null;
    // this.appointments = null;
    console.log(error)
  }
  canceled(): void {
    this.router.navigate(['/cancelcomponent']);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  searchs(){
    this.patientService.searchcancelappointment(this.search).subscribe(
      data =>{
        let array = [];
        var results = data; 
        array.push(results)
        this.results =array;
        console.log(array)
        this.dataSource.data = this.results;
        this.totalLength = this.results.length;
      },
      error =>{
        this.results = undefined;
        this.pages = null;

      }
    )
  }
}
