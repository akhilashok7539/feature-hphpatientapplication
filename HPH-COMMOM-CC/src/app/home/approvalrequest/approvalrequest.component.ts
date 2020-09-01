import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-approvalrequest',
  templateUrl: './approvalrequest.component.html',
  styleUrls: ['./approvalrequest.component.css']
})
export class ApprovalrequestComponent implements OnInit {
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
  doctorslist: any;
  errors: any;
  constructor(private router:Router,private toaster:ToastrService,private patientservice:PatientService) { }

  ngOnInit() {
    this.patientservice.gethospitalApprovalReequest(this.pageIndex).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  handlerError(error){
    this.dataSource = new MatTableDataSource();
    this.doctorslist = null;
    this.totalLength = 0;
  }
  handlerSucess(data){
    this.doctorslist=data['content'];
  
    this.dataSource.data = this.doctorslist;
  }
  approve(doctors){
    this.isLoading = true;
    this.buttonapprove = 'Processing';
    sessionStorage.setItem("doctorId", doctors.doctorId.toString());
    let userId = sessionStorage.getItem("doctorId");
    let req ={
  
    }
    this.patientservice.approveRequest(userId,req).subscribe(
      data => this.handlerSucess1(data),
      error => this.handlerError1(error)
    )
  }
  handlerSucess1(data){
    this.isLoading = false;
    this.buttonapprove= 'Approve';
    this.toaster.success('Request Approved')
    this.ngOnInit();
  }
  handlerError1(error){
    this.isLoading = false;
    this.buttonapprove= 'Approve';
    this.errors = error.error['error'];
    if(this.errors == 'No data found '){
      this.doctorslist = [];
    }
    else {
      this.toaster.error('Failed to Approved Request');

    }
  }
  reject(doctors){
    this.isLoadingReject = true;
    this.buttonreject = 'Processing';
    sessionStorage.setItem("doctorId", doctors.doctorId.toString());
    let userId = sessionStorage.getItem("doctorId");
    let req ={
  
    }
    this.patientservice.rejectRequest(userId,req).subscribe(
      data => this.handlerSucess12(data),
      error => this.handlerError1(error)
    )
    
  }
  handlerSucess12(data){
    this.isLoadingReject = false;
    this.buttonreject = 'Reject';
    this.toaster.success('Request Rejected')
    this.ngOnInit();
  }
  handlerError12(error){
    this.isLoadingReject = false;
    this.buttonreject = 'Reject';
    this.toaster.error('Failed to reject request')
  }
  view(doctors){
    console.log(doctors)
    sessionStorage.setItem("editUserId", doctors.doctorId.toString());
   
    this.router.navigate(['/doctorview']);
  }
  changePage(event){
    let userId = localStorage.getItem("currentuserId");

    this.patientservice.gethospitalApprovalReequest(event.pageIndex).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
}
