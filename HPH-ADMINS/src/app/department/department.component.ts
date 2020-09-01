import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from './department.service';
import { Department } from '../_models/department';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  deptList :any;
  departmetnId:any;
  searchString:any;
  displayedColumns = ['specName', 'Delete',];
  limit:number = 15;
  skip:number = 0;
  totalLength:number = 0;
  pageIndex : number = 0;
  pageLimit:number[] = [5, 10] ; 
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator ,{static:false}) paginator: MatPaginator;
  constructor(private router:Router,private departmentService:DepartmentService,private toaster:ToastrService) { }

  ngOnInit() {

    this.departmentService.getDepartments().subscribe(
      data=>{
        this.deptList =data;
        console.log( this.deptList)
        // this.totalLength = this.deptList.length;
        this.dataSource.data = this.deptList;
      })
  }
  addDepat(){
    this.router.navigate(['/add-department']);
  }

  delete(dept){
  sessionStorage.setItem("departmentId", dept.specId.toString());
   
  let userId = sessionStorage.getItem("departmentId");
  console.log(userId)
  this.departmentService.deleteDepatment(userId).subscribe(
  data => this.handlerSucess(data),
  error => this.handlerError(error)
)

  }
  handlerSucess(data){
    this.toaster.success('Department deleted successfully');
  
    console.log('department deleted sucessfullty');
    sessionStorage.clear()
    console.log(data)
    this.deptList =null;
    this.ngOnInit();
  }
  handlerError(error){
    // this.deptList =null;
    console.log(error)
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
