import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HospitalService } from '../hospital/hospital.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {
  results: any;
  displayedColumns = ['patientId','name', 'phone', 'date', 'sex'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  searchString: any;
  dataSource = new MatTableDataSource();
  patientList = [];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private hospitalservice:HospitalService) { }

  ngOnInit() {
    this.hospitalservice.getallpatientdetails().subscribe(
      data =>{
        console.log(data)
        this.patientList = data['content'];
        this.dataSource.data = this.patientList;
      },
      error =>{
        this.dataSource = new MatTableDataSource();

      }
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  changePage(e)
  {

  }
}
