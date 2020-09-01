import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Patient } from 'src/app/_model/patient';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  bookingId: any;

  aa: boolean = false;

  patient: Observable<Patient[]>;
  doctor: any;

  categorySelected: any = '';
  ccId: any;
  PENDING = 'PENDING';
  CONFIRMED = 'CONFIRMED';
  FIRST_CALL_CONFIRMED = 'FIRST_CALL_CONFIRMED';
  SECOND_CALL_CONFIRMED = 'SECOND_CALL_CONFIRMED';
  COMPLETED = 'COMPLETED';
  CANCELLED = 'CANCELLED';
  CANCEL_STATUS = 'pending';
  patientList: FormGroup;
  pagination: any;
  page: number = 0;
  pages: Array<any>;
  results: any;

  errors: any;
  searchKeyword: string;
  values: any = '';
  searchString: number;
  category: any;
  displayedColumns = ['bookingId','patientId', 'patientName', 'date', 'time', 'department', 'docname', 'phoneNumber', 'complete', 'cancel'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  ccDetails: any;
  ccID: any;

  constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute, private patientService: PatientService, private toaster: ToastrService,
    private _router: Router) {

  }


  ngOnInit() {

    // this.getListByCategory(this.categorySelected);
    this.ccDetails = JSON.parse(localStorage.getItem('currentCc'));
    this.ccID = this.ccDetails.ccId;
    this.patientList = this.formBuilder.group({

      list: ['', Validators.required],
      search: ['', Validators.required]
    });
    // this.patientService.refresh$.subscribe(
    //   () => {
    //     this.getPatientlist();
    //   });

    this.getPatientlist();

  }
  getPatientlist() {
    this.patientService.getpatientByDoctor(this.ccID, this.pageIndex, this.PENDING).subscribe(

      data => this.handlerSucessData(data),
      error => this.handlerErrordata(error)
    );
  }


  handlerSucessData(data) {
    this.results = data['content'];
    this.dataSource.data = this.results;
    this.totalLength = data['totalElements'];

  }
  handlerErrordata(error) {
    console.log('error')
    this.errors = error.error['error'];
    this.dataSource = new MatTableDataSource();
    this.totalLength = 0;
  }

  openDialog(bookingId) {
    const users = JSON.parse(localStorage.getItem('currentCc'));
    this.ccId = users['ccId'];
    this.bookingId = bookingId;
    
    let req = {
    }
    this.patientService.cancelAppoinmented(this.ccId, this.bookingId, this.CANCELLED, req).subscribe(
      data => {
        if(this.CANCEL_STATUS == 'pending')
        {
          this.toaster.success('Appointment cancelled successfully');
          this.getPatientlist();
        }
        else if(this.CANCEL_STATUS == 'firstcall')
        {
          this.toaster.success('Appointment cancelled successfully');
          this.firstcall();
        }
        else if(this.CANCEL_STATUS == 'secondcall')
        {
          this.secondcallconfirm();
          this.toaster.success('Appointment cancelled successfully');

        }
        else if(this.CANCEL_STATUS == 'confirmed')
        {
          this.toaster.success('Appointment cancelled successfully');
          this.confirmedappointmnets();

        }
        

      },
      error => {
        this.toaster.error('There are too many request,please wait for some time');
      }
    )
  }
  confirm(res){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      // width: '400px'
      data: {"bookingid":res.bookingId,"status":this.FIRST_CALL_CONFIRMED},

      
      // height:'300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPatientlist();
      console.log('The dialog was closed pending');
     
    });
  }
  // confirm(res) {
  //   const users = JSON.parse(localStorage.getItem('currentCc'));
  //   this.ccId = users['ccId'];
  //   console.log(this.ccId)
  //   sessionStorage.setItem("bookId", res.bookingId.toString());
  //   console.log(sessionStorage)
  //   let bookingId = sessionStorage.getItem("bookId");
  //   console.log(bookingId)
  //   let req = {
  //   }
  //   this.patientService.appointmentConfirm(this.ccId, bookingId, req, this.FIRST_CALL_CONFIRMED).subscribe(
  //     data => this.handlerDataConfirm(data),
  //     error => this.handlerDataConfirmError(error)
  //   )
  // }
  // handlerDataConfirm(data) {
  //   this.getPatientlist();
  //   this.toaster.success('Appointment confirmed successfully');
  // }
  // handlerDataConfirmError(error) {
  //   this.toaster.error('There are too many request,please wait for some time');
  // }
  onKey(event: any) {
    this.page = 0;
    this.values = event.target.value;
    console.log(this.values)
    if (this.category == 'Doctor') {

      this.searchKeyword = 'doctor';
      this.patientService.getpatientByDoctorsearch(this.page, this.values).subscribe(
        data => this.handlerSucessData(data),
        error => this.handlerErrordata(error)
      );
    }
    else if (this.category == 'Hospital') {

      this.searchKeyword = 'hospital';
      this.patientService.getPatientByHospitalsearch(this.page, this.values).subscribe(
        data => this.handlerSucessData(data),
        error => this.handlerErrordata(error)
      );
    }
  }
  // getListByCategory(cat) {
  //   this.category = cat;
  //   console.log(this.values)
  //   if (cat == 'Doctor') {
  //     this.searchString = null;
  //     this.searchKeyword = 'doctor';
  //     this.patientService.getpatientByDoctor(this.page).subscribe(
  //       data => this.handlerSucessData(data),
  //       error => this.handlerErrordata(error)
  //     );
  //   }
  //   else if (cat == 'Hospital') {
  //     this.searchString = null;
  //     this.searchKeyword = 'hospital';
  //     this.patientService.getPatientByHospital(this.page).subscribe(
  //       data => this.handlerSucessData(data),
  //       error => this.handlerErrordata(error)
  //     );
  //   }
  // }
  Pending() {
    this.CANCEL_STATUS = 'pending';
    this.getPatientlist();
  }
  firstcall() {
    this.CANCEL_STATUS = 'firstcall';

    this.patientService.getfirstcallconfirm(this.ccID, this.pageIndex, this.FIRST_CALL_CONFIRMED).subscribe(
      data => {
        this.results = data['content'];
        this.dataSource.data = this.results;
        this.totalLength = data['totalElements'];

      },
      error => {
        this.totalLength = 0;

        this.dataSource = new MatTableDataSource();
      }
    )

  }
  // firstcallconfirm(res) {
  //   const users = JSON.parse(localStorage.getItem('currentCc'));
  //   this.ccId = users['ccId'];
  //   console.log(this.ccId)
  //   sessionStorage.setItem("bookId", res.bookingId.toString());
  //   console.log(sessionStorage)
  //   let bookingId = sessionStorage.getItem("bookId");
  //   console.log(bookingId)
  //   let req = {
  //   }
  //   console.log(this.SECOND_CALL_CONFIRMED)
    // this.patientService.secondcallconfirm(this.ccId, bookingId, req, this.SECOND_CALL_CONFIRMED).subscribe(
  //     data => {
  //       this.firstcall();
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }
  firstcallconfirm(res){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      // width: '400px'
      data: {"bookingid":res.bookingId,"status":this.SECOND_CALL_CONFIRMED},
      
      // height:'300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.firstcall();
      console.log('The dialog was closed firstcall');
     
    });
  }
  secondcallconfirm() {
    this.CANCEL_STATUS = 'secondcall';

    this.patientService.getsecondcallConfirm(this.ccID, this.pageIndex, this.SECOND_CALL_CONFIRMED).subscribe(
      data => {
        this.results = data['content'];
        this.dataSource.data = this.results;
        this.totalLength = data['totalElements'];

      },
      error => {
        this.dataSource = new MatTableDataSource();
        this.totalLength = 0;

      }
    )
  }
  secondcallconfirmappintment(res){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      // width: '400px'
      data: {"bookingid":res.bookingId,"status":this.CONFIRMED},
      
      // height:'300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.secondcallconfirm();
      console.log('The dialog was closed secondcallconfirm');
     
    });
  }

  // secondcallconfirmappintment(res) {
  //   const users = JSON.parse(localStorage.getItem('currentCc'));
  //   this.ccId = users['ccId'];
  //   console.log(this.ccId)
  //   sessionStorage.setItem("bookId", res.bookingId.toString());
  //   console.log(sessionStorage)
  //   let bookingId = sessionStorage.getItem("bookId");
  //   console.log(bookingId)
  //   let req = {

  //   }
  //   this.patientService.secondcallconfirm(this.ccId, bookingId, req, this.CONFIRMED).subscribe(
  //     data => {
  //       this.secondcallconfirm();
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }
  confirmedappointmnets() {
    this.CANCEL_STATUS = 'confirmed';

    this.patientService.getconfirmedAppoinments(this.ccID, this.pageIndex, this.CONFIRMED).subscribe(
      data => {
        this.results = data['content'];
        this.dataSource.data = this.results;
        this.totalLength = data['totalElements'];

      },
      error => {
        this.dataSource = new MatTableDataSource();
        this.totalLength = 0;

      }
    )
  }
  complteappointmnet(res){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      // width: '400px'
      data: {"bookingid":res.bookingId,"status":this.COMPLETED},
      
      // height:'300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.confirmedappointmnets();
      console.log('The dialog was closed secondcallconfirm');
     
    });
  }
  // complteappointmnet(res) {
  //   const users = JSON.parse(localStorage.getItem('currentCc'));
  //   this.ccId = users['ccId'];
  //   console.log(this.ccId)
  //   sessionStorage.setItem("bookId", res.bookingId.toString());
  //   console.log(sessionStorage)
  //   let bookingId = sessionStorage.getItem("bookId");
  //   console.log(bookingId)
  //   let req = {

  //   }
  //   this.patientService.secondcallconfirm(this.ccId, bookingId, req, this.COMPLETED).subscribe(
  //     data => {
  //       this.confirmedappointmnets();
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }
  completedappointmnets() {
    this.CANCEL_STATUS = 'completed';

    this.patientService.completedappointmnets(this.ccID, this.pageIndex, this.COMPLETED).subscribe(
      data => {
        this.results = data['content'];
        this.dataSource.data = this.results;
        this.totalLength = data['totalElements'];
      },
      error => {
        this.dataSource = new MatTableDataSource();
      }
    )
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;


  }
  changePagepending(event) {
    console.log(event.pageIndex)
    this.patientService.getpatientByDoctor(this.ccID, event.pageIndex, this.PENDING).subscribe(

      data => this.handlerSucessData(data),
      error => this.handlerErrordata(error)
    );
  }
  changePageforfirstcall(event) {
    this.patientService.getfirstcallconfirm(this.ccID, event.pageIndex, this.FIRST_CALL_CONFIRMED).subscribe(

      data => this.handlerSucessData(data),
      error => this.handlerErrordata(error)
    );
  }
  changePageforsecondcall(event) {
    this.patientService.getsecondcallConfirm(this.ccID, event.pageIndex, this.SECOND_CALL_CONFIRMED).subscribe(

      data => this.handlerSucessData(data),
      error => this.handlerErrordata(error)
    );
  }
  getconfirednext(event) {
    this.patientService.getconfirmedAppoinments(this.ccID, event.pageIndex, this.CONFIRMED).subscribe(
      data => this.handlerSucessData(data),
      error => this.handlerErrordata(error)
    );
  }
  changecompletednext(event) {
    this.patientService.completedappointmnets(this.ccID, event.pageIndex, this.COMPLETED).subscribe(
      data => this.handlerSucessData(data),
      error => this.handlerErrordata(error)
    );
  }
}
