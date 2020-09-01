import { Component, OnInit, ViewChild } from '@angular/core';
import { CommandCenter } from 'src/app/_model/commandcenter';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommandcenterService } from './commandcenter.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-commandcenter',
  templateUrl: './commandcenter.component.html',
  styleUrls: ['./commandcenter.component.css']
})
export class CommandcenterComponent implements OnInit {


  public status1= "INACTIVE";
  public status2= "ACTIVE";
  profileId=7;
  private page:number=0;
  // private pages = [];
  private pages:Array<number>;
  results:any;
  

  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  displayedColumns = ['name', 'contact', 'email', 'active', 'view'];
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  userId: any;
  constructor(private router:Router,private ccService:CommandcenterService) { }

  ngOnInit() {

    // this.ccService.getAllCC(this.page).subscribe(
    //   data => this.handlerSucess(data),
    //   error => this.handlerError(error)
    // )
    this.getallCC();
    this.userId = localStorage.getItem("currentuserId");

  }
getallCC(){
  this.userId = localStorage.getItem("currentuserId");
  this.ccService.getAllcc(this.userId).subscribe(
    data => this.handlerSucess(data),
    error => this.handlerError(error)
  )
}
 

  handlerSucess(data){
    // this.results=data['content'];
    this.results=data;

    this.dataSource.data = this.results;

  }
  handlerError(error){

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  changePage(event) {
    console.log(event.pageIndex)
    // this.ccService.getAllcc(this.userId).subscribe(
    //   data => this.handlerSucess(data),
    //   error => this.handlerError(error)
    // )
  }
  addcc(){
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
    this.router.navigate(['/view-commandcenter']);
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

}
