import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onprogress',
  templateUrl: './onprogress.component.html',
  styleUrls: ['./onprogress.component.css']
})
export class OnprogressComponent implements OnInit {
  displayedColumns = ['patientId', 'patientName', 'date', 'time', 'department', 'docname', 'phoneNumber', 'complete', 'cancel'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  ccDetails: any;
  ccID: any;
  TO_IP = 'TO_IP';
  SURGERY = 'SURGERY';
  FOLLOW_UP = 'FOLLOW_UP';
  results: any;
  BookingIdFollowUp: any;
  doctorId: any;
  constructor(private patientService: PatientService,private router:Router) { }

  ngOnInit() {
    this.ccDetails = JSON.parse(localStorage.getItem('currentCc'));
    this.ccID = this.ccDetails.ccId;
    this.getalltoIP();
  }

  getalltoIP() {
    this.patientService.getalltoIP(this.ccID, this.pageIndex, this.TO_IP).subscribe(

      data => {
        this.results = data['content'];
        this.dataSource.data = this.results
      },
      error => {
        this.dataSource = new MatTableDataSource();

      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;


  }
  tabClick(tab){
    if(tab.index ==0){
      console.log('ip')
      this.getalltoIP();
    }
    else  if(tab.index ==1)
    {
     
      console.log('suregey')
      this.getallsurgery();
    }
    else if(tab.index == 2)
    {
      console.log('follow up')
      this.getallFollwUpBooking();
    }
  }
  getallsurgery(){
    this.pageIndex = 0;
    this.patientService.getallsurgery(this.ccID, this.pageIndex, this.SURGERY).subscribe(

      data => {
        this.results = data['content'];
        this.dataSource.data = this.results;
        this.totalLength = data['totalElements'];

      },
      error => {
        this.dataSource = new MatTableDataSource();
        this.totalLength = 0;
      }
    );
  }
  getallFollwUpBooking(){
    this.pageIndex = 0;
    this.patientService.getallFollwUpBooking(this.ccID, this.pageIndex, this.FOLLOW_UP).subscribe(

      data => {
        this.results = data['content'];
        this.dataSource.data = this.results;
        this.totalLength = data['totalElements'];
      },
      error => {
        this.dataSource = new MatTableDataSource();
        this.totalLength = 0;
      }
    );
  }
  chooseDate(e){
    console.log(e)
    this.BookingIdFollowUp = e.followUpBookingId.bookingId;
    this.doctorId =  e.followUpBookingId.doctor.doctorId;
    this.router.navigate(['/followupappointment',this.BookingIdFollowUp,this.doctorId ]);
  }
  chooseIP(ip)
  {
    console.log(ip.cc.hospital.hospitalId)
    this.router.navigate(['/chooseIpInfra',ip.bookingId,ip.cc.hospital.hospitalId])
  }
}
