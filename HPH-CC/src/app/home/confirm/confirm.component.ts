import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/_model/patient';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  bookingId: any;
  ccId:any;
  private page:number=0;
  private pages:Array<any>;
  status2 = 'CANCELLED';
  APPOINTMENTSTATUS ;
  results:any;
  errors: any;
  constructor( public dialogRef: MatDialogRef<ConfirmComponent>,private toaster:ToastrService, 
    public dialog: MatDialog,private patientService:PatientService,
    @Inject(MAT_DIALOG_DATA) data,private router:Router) {
    this.bookingId =data.bookingid;
    this.APPOINTMENTSTATUS = data.status;
    console.log(this.APPOINTMENTSTATUS)
     }

  ngOnInit() {
    
    const users = JSON.parse(localStorage.getItem('currentCc'));
    this.ccId = users['ccId'];
    //console.log(this.ccId)
    
  }

  
  
confirm(){
  const users = JSON.parse(localStorage.getItem('currentCc'));
  this.ccId = users['ccId'];

  let req ={
    
  }
  this.patientService.appointmentConfirm(this.ccId, this.bookingId, req, this.APPOINTMENTSTATUS).subscribe(
        data => this.handlerDataConfirm(data),
        error => this.handlerDataConfirmError(error)
      )
}
handlerDataConfirm(data){
  this.dialogRef.close();
  this.toaster.success('Appointment Confirmed Successfully');

}

handlerDataConfirmError(error){
  // this.refresh();
  this.toaster.error('There are too many request,please wait for some time');
}
NoClick(){
  this.dialogRef.close();
}
 onNoClick(){
   this.dialogRef.close();

  }
  


  
}
