import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from '../hospital/hospital.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  results: any;
  displayedColumns = ['salespersonname', 'phone', 'Email', 'dob', 'gender', 'edit'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  searchString: any;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private router: Router, private hospitalservice: HospitalService) { }

  ngOnInit() {
    this.getallSales();
  }
  getallSales() {
    this.hospitalservice.getallHospitalService(this.pageIndex).subscribe(
      data => {
        this.results = data['content'];
        console.log(this.results)
        this.totalLength = this.results.length;
        this.dataSource.data = this.results;
      },
      error => {

      }
    )
  }
  addsales() {
    this.router.navigate(['/add-sales']);
  }
  edit(results) {
    this.router.navigate(['/edit-sales', results]);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  changePage(event) {
    console.log(event.pageIndex)
    this.hospitalservice.getallHospitalService(event.pageIndex).subscribe(
      data => {
        this.results = data['content'];
        console.log(this.results)
        this.totalLength = this.results.length;
        this.dataSource.data = this.results;
      },
      error => {

      }
    )

  }
}
