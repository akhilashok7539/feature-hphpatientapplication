import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../doctor/doctor.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrls: ['./approval-request.component.css']
})
export class ApprovalRequestComponent implements OnInit {
   pages:Array<any>;
   page:number=0;
   doctorslist =[];
  errors: any;
  isLoading = false;
  isLoadingReject = false;
  buttonapprove = 'Approve';
  buttonreject = 'Reject';
  limit:number = 15;
  skip:number = 0;
  totalLength:number = 0;
  pageIndex : number = 0;
  displayedColumns = ['doctname','phone','proof','approve'];
  pageLimit:number[] = [5, 10] ; 
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator ,{static:false}) paginator: MatPaginator;
  constructor(private router:Router,private doctorservice:DoctorService,private toaster:ToastrService) { }

  ngOnInit() {
    let userId = localStorage.getItem("currentuserId");
    console.log(userId)
    this.doctorservice.gethospitalApprovalReequest(this.pageIndex,userId).subscribe(
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
    this.doctorslist=data['content'];
    // this.pages =  new Array(data['totalPages']);
    // console.log(this.doctorslist)
    this.dataSource.data = this.doctorslist;
  }
  handlerError(error){

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  // approve(doctors){
  //   this.isLoading = true;
  //   this.buttonapprove = 'Processing';
  //   sessionStorage.setItem("doctorId", doctors.doctorId.toString());
  //   let userId = sessionStorage.getItem("doctorId");
  //   let req ={
  
  //   }
  //   this.doctorservice.approveRequest(userId,req).subscribe(
  //     data => this.handlerSucess1(data),
  //     error => this.handlerError1(error)
  //   )
  // }
  // handlerSucess1(data){
  //   this.isLoading = false;
  //   this.buttonapprove= 'Approve';
  //   this.toaster.success('Request Approved')
  //   this.ngOnInit();
  // }
  // handlerError1(error){
  //   this.isLoading = false;
  //   this.buttonapprove= 'Approve';
  //   this.errors = error.error['error'];
  //   if(this.errors == 'No data found '){
  //     this.doctorslist = [];
  //   }
  //   else {
  //     this.toaster.error('Failed to Approved Request');

  //   }
  // }
  approve(doctors)
  {
    this.router.navigate(['/approve-and-mapdepartment',doctors.doctorId]);
  }
  reject(doctors){
    this.isLoadingReject = true;
    this.buttonreject = 'Processing';
    sessionStorage.setItem("doctorId", doctors.doctorId.toString());
    let userId = sessionStorage.getItem("doctorId");
    let req ={
  
    }
    this.doctorservice.rejectRequest(userId,req).subscribe(
      data => this.handlerSucess12(data),
      error => this.handlerError12(error)
    )
    
  }
  handlerSucess12(data){
    this.isLoadingReject = false;
    this.buttonreject = 'Reject';
    this.toaster.success('Request Rejected')
    this.ngOnInit();
    // window.location.reload();
  }
  handlerError12(error){
    this.isLoadingReject = false;
    this.buttonreject = 'Reject';
    this.toaster.error('Failed to reject request')
  }
  view(doctors){
    console.log(doctors)
    sessionStorage.setItem("editUserId", doctors.doctorId.toString());
    // let userId = sessionStorage.getItem("doctorId");
    this.router.navigate(['/doctor-view']);
  }
  changePage(event){
    let userId = localStorage.getItem("currentuserId");

    this.doctorservice.gethospitalApprovalReequest(event.pageIndex,userId).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
}
