import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddHealthHistoryComponent } from './add-health-history/add-health-history.component';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patienthealthrecords',
  templateUrl: './patienthealthrecords.component.html',
  styleUrls: ['./patienthealthrecords.component.css']
})
export class PatienthealthrecordsComponent implements OnInit {
  patientId: any;
  errors: any;
  healthhistory: any[];

  constructor(public dialog: MatDialog, private userservice: UserService, private toaster: ToastrService) { }

  ngOnInit() {
    this.getallhealthHistory();
    this.userservice.refresh$.subscribe(
      () => {
        this.getallhealthHistory();
      });
  }
  addHealthHistory() {
    const dialogRef = this.dialog.open(AddHealthHistoryComponent, {
      height: '380px'
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getallhealthHistory() {
    const users = JSON.parse(localStorage.getItem('currentPatient'));
    this.patientId = users['patientId'];
    this.userservice.getPatientHealthHistory(this.patientId).subscribe(
      data => this.handlerData(data),
      error => this.handlerError(error)
    )
  }
  handlerData(data) {
    this.healthhistory = data;
    console.log(this.healthhistory)
  }
  handlerError(error) {
    this.errors = error.error['error'];
    if (this.errors == 'No data found') {
      this.healthhistory = [];
    }
  }
  delete(health) {
    let healthId = health.healthId;
    this.userservice.deletehealthhistory(healthId).subscribe(
      data => {
        this.ngOnInit();
        this.toaster.success('Helath history deleted successfully');

      },
      error => {
        this.toaster.error('Unable to delete Helath history');

      }
    )
  }
  view(health){
    let healthId = health.healthId;
    this.userservice.downloadHealthHistory(healthId);
  }
}
