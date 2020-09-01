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
  //status = 'CANCELLED';
  results:any;
  errors: any;
  constructor( public dialogRef: MatDialogRef<ConfirmComponent>,private toaster:ToastrService, 
    public dialog: MatDialog,private patientservice:PatientService,
    @Inject(MAT_DIALOG_DATA) data,private router:Router) {
    this.bookingId =data;
    //console.log(this.bookingId)
     }

  ngOnInit() {
    
    const users = JSON.parse(localStorage.getItem('currentCc'));
    this.ccId = users['ccId'];
    //console.log(this.ccId)

    


    
  }

  
  // handlerSucessData(data){
    
  //   this.results=data['content'];
  //   console.log(this.results)

  //   const itemIds = [];
  //   for (var i = 0; i < data.totalPages; i++)
  //   {
  //     itemIds.push(data[i]);
  //   }

  //   console.log(itemIds)
  //   this.pages = itemIds
   
  //   console.log(this.pages)
  // }
  // handlerErrordata(error)
  // {
  //   this.results = [];
  //   this.errors = error.error['error'];
  //   if(this.errors == 'No data found')
  //   { 
    
  //     window.location.reload();
  //     this.results = [];
     
  //   }
  // }
cancel(){
  const users = JSON.parse(localStorage.getItem('currentCc'));
  this.ccId = users['ccId'];
  //console.log(this.ccId)
 
  //console.log(status)
  let req ={
    
  }
  this.patientservice.cancelAppoinmented(this.ccId,this.bookingId,this.status2,req).subscribe(
    data => this.handlerSucess1(data),
    error => this.handlerError1(error)
  )
}
handlerSucess1(data){
  this.dialogRef.close();
  this.toaster.success('Appointment cancelled successfully');
  // this.refresh();
  // window.location.reload();
  //console.log(data)
}

handlerError1(error){
  // this.refresh();
  this.toaster.error('There are too many request,please wait for some time');
}
NoClick(){
  this.dialogRef.close();
}
 onNoClick(){
   this.dialogRef.close();
  // let req ={
    
  // }
  // this.patientservice.cancelAppoinment(this.ccId,this.bookingId,req).subscribe(
  //   data => this.handlerSucess(data),
  //   error => this.handlerError(error)
  // )
  }
  handlerSucess(data){
    this.dialogRef.close();
    // this.router.navigate(['/patient-list']);
    // window.location.reload();
    console.log(data.callCount)
    this.toaster.error('Cant reach patient on mobile');
    if(data.callCount == 4)
    {
      this.toaster.error('Cant reach patient, Appointment cancelled');
    }
    
    
    }
    handlerError(error){
      console.log(error)
      this.toaster.error('Cant reach patient, Appointment cancelled');
    }


  
}
