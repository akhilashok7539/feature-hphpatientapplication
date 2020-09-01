import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { PatientService } from '../../patient.service';

@Component({
  selector: 'app-first-call-confirmed-appointments',
  templateUrl: './first-call-confirmed-appointments.component.html',
  styleUrls: ['./first-call-confirmed-appointments.component.css']
})
export class FirstCallConfirmedAppointmentsComponent implements OnInit {
  displayedColumns = ['patientId', 'patientName','date','time','department','docname','phoneNumber','status','complete','cancel'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  results: any;
  errors: any;
  constructor(public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute, private patientService: PatientService,
    private toaster: ToastrService,
) {

  }

  ngOnInit() {
    this.getPatientlist();
  }
  getPatientlist() {
    // this.patientService.getpatientByDoctor(this.pageIndex).subscribe(
    //   data => this.handlerSucessData(data),
    //   error => this.handlerErrordata(error)
    // );
  }
  handlerSucessData(data) {
    this.results = data['content'];
    console.log(this.results)
    this.dataSource.data = this.results;


  }
  handlerErrordata(error) {
    this.dataSource = new MatTableDataSource();

    console.log('error')
    this.errors = error.error['error'];
    if (this.errors == 'No data found') {
      this.results = [];
    }
   
  }

}
