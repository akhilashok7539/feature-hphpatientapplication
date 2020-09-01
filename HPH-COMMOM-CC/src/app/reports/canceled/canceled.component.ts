import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/home/patient.service';
import { Patient } from 'src/app/_model/patient';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrls: ['./canceled.component.css']
})
export class CanceledComponent implements OnInit {
  status = 'CONFIRMED';
  status2 = 'CANCELLED';
  // ccid = 70003;
  searchString: string;
  page: number = 0;
  pages: Array<any>;
  results;
  pendingresults;
  canceledResults;
  ccid: any;
  aa: boolean = false;
  search: any;
  displayedColumns = ['BookingId', 'patientId', 'patientName', 'date', 'time', 'department', 'docname', 'phoneNumber'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private router: Router, private patientservice: PatientService) { }

  ngOnInit() {
    this.SearchSelected(this.searchString);
    // const users = JSON.parse(localStorage.getItem('currentCc'));
    // this.ccid = users['ccId'];
    this.patientservice.getPatientByCancelled().subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;

    this.ngOnInit();

    // this.appointConfirm();


  }
  SearchSelected(searchString) {
    console.log(searchString)
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;

  }
  handlerSucess(data) {

    this.dataSource.data = data;
    this.totalLength = data.length;
  }
  handlerError(error) {
    console.log(error)
    this.pages = null;
  }
  appointConfirm() {
    this.router.navigate(['/reports']);
  }

  searchs() {
    this.patientservice.searchcancelappointment(this.search).subscribe(
      data => {
        let array = [];
        var results = data;
        array.push(results)
        this.results = array;
        this.dataSource.data = this.results;
        this.totalLength =  this.results.length;

        console.log(array)
      },
      error => {
        this.results = undefined;
        this.pages = null;

      }
    )
  }
}

