import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HospitalService } from 'src/app/hospital/hospital.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ipinfra',
  templateUrl: './ipinfra.component.html',
  styleUrls: ['./ipinfra.component.css']
})
export class IpinfraComponent implements OnInit {
  hospitalId: any;
  userDetails: any;
  message: string;
  displayedColumns = ['Room', 'cost', 'feature', 'edit'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  reuslts: any;
  constructor(private hospitalservice:HospitalService,private router:Router) { }

  ngOnInit() {
    this.getalldata();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  getalldata()
  {
   let userId = localStorage.getItem("currentuserId");

    this.hospitalservice.getIpInfraByHospitalId(userId).subscribe(
      data =>{
        this.reuslts = data;
        this.dataSource.data = this.reuslts;
      },
      error =>{

      }
    )
  }
  edit(req)
  {
    this.router.navigate(['/edit-infra',req]);
  }
}
