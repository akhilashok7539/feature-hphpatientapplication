import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  doctorId:any;
  doctors: any;
  dateSelected:any;
  hospitalId: any;
  docLeaveDetails: any;
  deaprtmentId: any;
  message: string;
  Request = '';
  constructor(private datePipe:DatePipe, private toaster:ToastrService,
    private router:Router,private doctorservice:DoctorService) { }

  ngOnInit() {
    // var data = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    // this.dateSelected = data;
    const users = JSON.parse(localStorage.getItem('currentselectedDoctor'));
    this.deaprtmentId = users['0'].department.departmentId;  
    console.log(this.deaprtmentId);
    this.doctorservice.getAllLeaveRequestByDepartment(this.deaprtmentId).subscribe(
      data =>{
        this.docLeaveDetails = data;
      
      },
      error =>{
    
          this.message = 'No leave records available';
          console.log(this.message)
      }
    )
    
  }

  click(person)
  {
    console.log(person.doctor.doctorId)
    this.doctorId = person.doctor.doctorId;
    sessionStorage.setItem('DoctorIdLeave',JSON.stringify(this.doctorId))
    // this.timelsots = true;
    this.router.navigate(['/doctiming-appointments']);
  }
  approve(person){
    console.log(person.leaveId)
    this.Request = 'Request Approving....';
    let req = {}
    this.doctorservice.approveleaveRequest(person.leaveId,req).subscribe(
      data =>{
        this.toaster.success('Leave Request Approved');
        this.Request = '';
        this.ngOnInit();
      },
      error =>{
        this.Request = '';
      }
    )
  }
  reject(person)
  {
    this.Request = 'Request Rejecting....';
    let req = {}
    this.doctorservice.rejectleaveRequest(person.leaveId,req).subscribe(
      data =>{
        this.toaster.success('Leave Request Rejected');
        this.Request = '';
        this.ngOnInit();
      },
      error =>{
        this.Request = '';
      }
    )
  }
}
