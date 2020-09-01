import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../hospital/hospital.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrls: ['./approval-request.component.css']
})
export class ApprovalRequestComponent implements OnInit {
  pages: Array<any>;
  page: number = 0;
  doctorslist = [];
  error: any;
  isLoading = false;
  buttonapprove = 'Approve';
  buttonreject = 'Reject';
  hospId: any;
  displayedColumns = ['HospitalName', 'phone', 'status', 'assign', 'view', 'approve', 'reject'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10,15];
  searchString: any;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  messages: string;
  constructor(private hospitalservice: HospitalService, private router: Router,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.hospitalservice.gethospitalApprovalReequest(this.page).subscribe(
      data => {
        this.doctorslist = data['content'];
        this.pages = new Array(data['totalPages']);
        console.log(this.doctorslist)
        this.totalLength = data['totalElements'];
        this.dataSource.data = this.doctorslist;
        this.messages = 'approval request found';

      },
      error => {
        this.dataSource = new MatTableDataSource();
        this.doctorslist = [];
        this.dataSource.data = null;
        console.log(this.totalLength)
        this.totalLength = 0;
        this.messages = 'No approval request found';
      }
      // this.handlerSucess(data),
      // error => this.handlerError(error)
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  changePage(event){
    this.hospitalservice.gethospitalApprovalReequest(event.pageIndex).subscribe(
      data => {
        this.doctorslist = data['content'];
        this.pages = new Array(data['totalPages']);
        console.log(this.doctorslist)
        this.totalLength = data['totalElements'];
        this.dataSource.data = this.doctorslist;
        this.messages = 'approval request found';

      },
      error => {
        this.dataSource = new MatTableDataSource();
        this.doctorslist = [];
        this.dataSource.data = null;
        console.log(this.totalLength)
        this.totalLength = 0;
        this.messages = 'No approval request found';
      }
      // this.handlerSucess(data),
      // error => this.handlerError(error)
    )
  }
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.ngOnInit();
  }
  // handlerSucess(data){
  //   this.doctorslist=data['content'];
  //   this.pages =  new Array(data['totalPages']);
  //   console.log(this.doctorslist)
  // }
  // handlerError(error){
  //   this.error = error.error['error'];
  //   if(this,error == 'No data found'){
  //     this.doctorslist = [];
  //   }

  // }
  statuschange(hospitals) {
    this.isLoading = true;
    this.buttonapprove = 'Processing';
    sessionStorage.setItem("hospitalId", hospitals.hospitalId.toString());
    let userId = sessionStorage.getItem("hospitalId");
    let req = {

    }
    this.hospitalservice.approveRequest(userId, req).subscribe(
      data => this.handlerSucess1(data),
      error => this.handlerError1(error)
    )
  }
  handlerSucess1(data) {
    this.isLoading = false;
    this.buttonapprove = 'Approve';
    this.toaster.success('Request Approved')
    this.ngOnInit();
    window.location.reload();
  }
  handlerError1(error) {
    this.isLoading = false;
    this.buttonapprove = 'Approve';
    this.toaster.error('Failed to Approved Request')
  }
  status(hospitals) {
    this.isLoading = true;
    this.buttonreject = 'Processing';
    sessionStorage.setItem("hospitalId", hospitals.hospitalId.toString());
    let userId = sessionStorage.getItem("hospitalId");
    let req = {

    }
    this.hospitalservice.rejectRequest(userId, req).subscribe(
      data => this.handlerSucess12(data),
      error => this.handlerError12(error)
    )
  }
  handlerSucess12(data) {
    this.isLoading = false;
    this.buttonreject = 'Reject';
    this.toaster.success('Request Rejected')
    this.ngOnInit();
    window.location.reload();
  }
  handlerError12(error) {
    this.isLoading = false;
    this.buttonreject = 'Reject';
    this.toaster.error('Failed to reject request')
  }
  view(hospitals) {
    sessionStorage.setItem("hospitalId", hospitals.hospitalId.toString());
    // let userId = sessionStorage.getItem("doctorId");
    this.router.navigate(['/viewHospital']);

  }
  assign(hospital) {
    console.log(hospital.hospitalId)
    this.hospId = hospital.hospitalId;
    this.router.navigate(['/getallsalesPerson', hospital]);
  }
}
