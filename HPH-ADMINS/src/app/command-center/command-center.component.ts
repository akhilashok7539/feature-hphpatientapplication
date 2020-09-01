import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommandcenterService } from './commandcenter.service';
import { CommandCenter } from '../_models/commandcenter';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-command-center',
  templateUrl: './command-center.component.html',
  styleUrls: ['./command-center.component.css']
})
export class CommandCenterComponent implements OnInit {
  // ccList :Observable<CommandCenter[]>;
  // cciD:any;
  public status1= "INACTIVE";
  public status2= "ACTIVE";
  profileId=7;
   page:number=0;
  // private pages = [];
   pages:Array<number>;
  results:any;

  displayedColumns = ['CCname', 'number','email','status'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  searchString:any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private router:Router,private ccService:CommandcenterService) { }

  ngOnInit() {

    this.ccService.getAllCC(this.page).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
 
    this.ngOnInit();


  }


  handlerSucess(data){
    this.results=data['content'];
    // const itemIds = [];
    // for (var i = 0; i < data.totalPages; i++)
    // {
    //   itemIds.push(data[i]);
    // }

    // console.log(itemIds)
    // this.pages = itemIds
    this.dataSource.data = this.results;
    // this.pages =  new Array(data['totalPages']);
    // this.pages =  data['totalPages'];

    console.log(this.pages)
    console.log(this.results)
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
  handlerError(error){

  }
  addCC(){
    this.router.navigate(['/addcc']);
  }

  edit(command:CommandCenter){
    sessionStorage.setItem("cmdId", command.ccId.toString());
    console.log(sessionStorage)
    this.router.navigate(['/edit-cc']);
  }
  view(command:CommandCenter){
    sessionStorage.setItem("cmdId", command.ccId.toString());
    console.log(sessionStorage)
    this.router.navigate(['/view-cc']);
  }
  status(command:CommandCenter){
    console.log(this.status1)
    sessionStorage.setItem("cmdId", command.ccId.toString());
    let userId = sessionStorage.getItem("cmdId");
    console.log(sessionStorage)

    let req ={

    }
    this.ccService.changeStatus(userId,this.status1,this.profileId,req).subscribe(
      data => this.handlerSucess1(data),
      error => this.handlerError1(error)
    )
  }

    handlerSucess1(data)
    {

    console.log('status changedd')
    this.ngOnInit();
    sessionStorage.clear();
    console.log(sessionStorage)
    }
    handlerError1(error)
    {
    console.log('STATUS NOT CHANGEDD ')
    } 

    statuschange(command:CommandCenter)
    {
      console.log(this.status2)
      sessionStorage.setItem("cmdId", command.ccId.toString());
      let userId = sessionStorage.getItem("cmdId");
      console.log(sessionStorage)
      let req ={

      }
      this.ccService.changeActiveStatus(userId,this.status2,this.profileId,req).subscribe(
        data => this.handlerSucess2(data),
        error => this.handlerError2(error)
      )
    }
    handlerSucess2(data){
      this.ngOnInit();
      sessionStorage.clear();
      console.log(sessionStorage)
      console.log('status changed')
      }
      handlerError2(error){
      console.log('STATUS NOT CHANGED ')
      }
      changePage(e){
        this.ccService.getAllCC(e.pageIndex).subscribe(
          data => this.handlerSucess(data),
          error => this.handlerError(error)
        )
      }
}
