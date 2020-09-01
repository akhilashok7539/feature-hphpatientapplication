import { Component, OnInit } from '@angular/core';
import { AddRelativeHealthrecordComponent } from './add-relative-healthrecord/add-relative-healthrecord.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-relativehelathrecords',
  templateUrl: './relativehelathrecords.component.html',
  styleUrls: ['./relativehelathrecords.component.css']
})
export class RelativehelathrecordsComponent implements OnInit {
  patientId: any;
  healthhistory: any;
  errors: any;

  constructor(public dialog: MatDialog,private userservice:UserService,private toaster:ToastrService) { }

  ngOnInit() {
    this.userservice.refresh$.subscribe(
      () => {
        this.getallhealthHistory();
      });
    this.getallhealthHistory();
  }
  addHealthHistory() {
    const dialogRef = this.dialog.open(AddRelativeHealthrecordComponent, {
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
    this.userservice.getRelativeHealthHistory(this.patientId).subscribe(
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
