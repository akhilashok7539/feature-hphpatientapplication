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
  constructor(private hospitalservice:HospitalService,  private toastr:ToastrService,
    private router:Router) { }


  ngOnInit() {
    this.userId = sessionStorage.getItem('hospitalId');

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
  this.toastr.success('Waiting For admin approval');
  this.router.navigate(['/Home']);
  }
  handlerError(error){
    this.isLoading = false;
    this.button = 'Complete Profile';
  }
}
