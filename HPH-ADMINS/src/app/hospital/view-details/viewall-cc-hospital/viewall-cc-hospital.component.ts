import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandcenterService } from 'src/app/command-center/commandcenter.service';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  selector: 'app-viewall-cc-hospital',
  templateUrl: './viewall-cc-hospital.component.html',
  styleUrls: ['./viewall-cc-hospital.component.css']
})
export class ViewallCcHospitalComponent implements OnInit {
  displayedColumns = ['ccName', 'email','mobNo','profileStatus'];
  limit:number = 15;
  skip:number = 0;
  totalLength:number = 0;
  pageIndex : number = 0;
  pageLimit:number[] = [5, 10] ; 
  dataSource = new MatTableDataSource();
  searchString:any;
  @ViewChild(MatPaginator ,{static:false}) paginator: MatPaginator;
  constructor(private activaterouter:ActivatedRoute,private router:Router,private ccService:CommandcenterService) { }
 
  ngOnInit() {
    this.activaterouter.params.subscribe(params =>{
      console.log(params.id)
    })
    this.ccService.getAllCC(this.totalLength).subscribe(
      data => {
        console.log(data)
        this.dataSource.data = data['content']
      },
      error => {
        
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
  changePage(event)
  {
    console.log(event.pageIndex);
    this.ccService.getAllCC(event.pageIndex).subscribe(
      data => {
        console.log(data)
        this.dataSource.data = data['content']
      },
      error => {
        
      }
    )
  }
}
