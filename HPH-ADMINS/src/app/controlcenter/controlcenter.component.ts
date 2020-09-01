import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { CommandcenterService } from '../command-center/commandcenter.service';

@Component({
  selector: 'app-controlcenter',
  templateUrl: './controlcenter.component.html',
  styleUrls: ['./controlcenter.component.css']
})
export class ControlcenterComponent implements OnInit {

  displayedColumns = ['CCname', 'email', 'status', 'button'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  commonCc: any;
  searchString:any;

  constructor(private router: Router, private ccService: CommandcenterService) { }

  ngOnInit() {
    this.getallcc();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;


  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  addCC() {
    this.router.navigate(['/addcc']);
  }
  getallcc() {
    this.ccService.getallCommonCC().subscribe(
      data => {
        this.commonCc = data['content'];
        this.dataSource.data = this.commonCc;

      },
      error => {
        this.dataSource = new MatTableDataSource();

      })
  }
  disable(e) {
    let ccid = e.cccId;
    let req ={

    }
    this.ccService.disablecc(ccid,req).subscribe(
      data => {
        this.getallcc();
      },
      error => {
        // this.dataSource = new MatTableDataSource();

      }
    )

  }
  enable(e) {
    let ccid = e.cccId;
    let req ={

    }
    this.ccService.enablecc(ccid,req).subscribe(
      data => {
        this.getallcc();

      },
      error => {
        // this.dataSource = new MatTableDataSource();

      }
    )
  }
}
