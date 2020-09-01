import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.css']
})
export class StatusChangeComponent implements OnInit {
  userId:any;
  isLoading = false;
  button = 'Complete Profile';
  constructor(private hospitalservice:HospitalService,private router:Router,private toaster:ToastrService) { }

  ngOnInit() {
     this.userId = sessionStorage.getItem('hospitalId');
     console.log(this.userId)
  }
  changeStatus(){
    this.isLoading = true;
    this.button = 'Processing';
    this.hospitalservice.changeStatusHospital(this.userId).subscribe(
      data => this.handlerSuess(data),
      error =>this.handlerError(error)
    )
  }
  handlerSuess(data){
  this.isLoading = false;
  this.button = 'Complete Profile';
  this.toaster.success('Hospital added successfully');
  this.router.navigate(['/Hospital']);
  }
  handlerError(error){
    this.isLoading = false;
    this.button = 'Complete Profile';
  }
}
