import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from 'src/app/hospital/hospital.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  results: any;
  error: any;
  limit:number = 10;
  skip:number = 0;
  totalLength:number = 0;
  pageIndex : number = 0;
  displayedColumns = ['deptname','adddepart'];
  pageLimit:number[] = [5, 10] ; 
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator ,{static:false}) paginator: MatPaginator;
  hospitalId: string;
  constructor(private router:Router,private hospitalservice:HospitalService) { }

  ngOnInit() {
    this.hospitalId = localStorage.getItem('currentuserId');

    this.getallDepartmentHospital(this.hospitalId);
  }
  adddepartment(){
    this.router.navigate(['/add-department']);
  }
  getallDepartmentHospital(hospitalId)
  {
    this.hospitalservice.gelAllDepartment(hospitalId).subscribe(
      data =>{
        this.results = data;
        this.dataSource.data = this.results;
        // this.results = this.dataSource.data;
        console.log(this.dataSource)
      },
      error =>{
        this.error = 'No Departments found'
      }
    )
  }
  edit(department){
    console.log(department)
    this.router.navigate(['/edit-department',department]);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  addDepartmentHead(department)
  {
    this.router.navigate(['/add-department-head',department])
  }
  addDoctors(department)
  {
    this.router.navigate(['/add-department-doctor',department]);
  }
}
