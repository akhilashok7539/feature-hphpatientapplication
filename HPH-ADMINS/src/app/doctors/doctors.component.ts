import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../hospital/hospital.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
   page:number=0; 
   pages:Array<any>;
  userId: string;
  doctorslist: any;
  Messages: string;
  docId: any;
  displayedColumns = ['Doctorname', 'mobno','email','hospitalname'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort ,{static:true}) sort: MatSort;
  constructor(private hospitalservice:HospitalService,private router:Router) { }

  ngOnInit() {
     this.userId = sessionStorage.getItem("hospitalId");
    console.log(this.userId)
    this.getallactiveDoctors()
  }
  getallactiveDoctors(){
    this.hospitalservice.getAlldoctoractive(this.page,this.userId).subscribe(
      data => this.handlerSucesss(data),
      error => this.handlerErrors(error)
    )
  }
  handlerSucesss(data){
    this.doctorslist=data['content'];
    this.pages =  new Array(data['totalPages']);
    this.dataSource.data = this.doctorslist;

    // this.totalLength = data['totalElements'];
    
    console.log(this.pages)
    console.log(this.doctorslist)
    this.Messages = 'Data found';

  }
  handlerErrors(error){
    // this.ngOnInit();
    this.dataSource = new MatTableDataSource();
    this.doctorslist = [];
    this.dataSource.data = null;
    this.pages = null;
    this.Messages = error.error.error;
    console.log(error.error.error)
  }
  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
 
    this.ngOnInit();


  }
  view(doc){
    console.log(doc)
    this.docId = doc.doctorId;
    sessionStorage.setItem('doctoIdForappointmnets',JSON.stringify(this.docId));
    this.router.navigate(['/appointments']);
  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }
  changePage(event) {
    console.log(event)

    console.log(event.pageIndex)
    this.hospitalservice.getAlldoctoractive(event.pageIndex,this.userId).subscribe(
      data => this.handlerSucesss(data),
      error => this.handlerErrors(error)
    )
  }
}
