import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from '../hospital/hospital.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  hospitalId: any;
  userDetails: any;
  message: string;
  displayedColumns = ['name', 'email', 'phone', 'destination'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private router:Router,private hospitalservice:HospitalService) { }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalId = users['hospitalId'];
    this.getallUser();
  }
  adduser(){
    this.router.navigate(['/add-user'])
  }
  getallUser(){
    this.hospitalservice.getallusers(this.hospitalId).subscribe(
      data =>{
        this.userDetails = data;
        this.dataSource.data = this.userDetails;
        this.message = 'users found';

      },
      error =>{
        this.message = 'no users found';
      }
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  changePage(event)
  {
    
  }
}
