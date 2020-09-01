import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/hospital/hospital.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor/doctor.service';

@Component({
  selector: 'app-mapping-department-to-doctor',
  templateUrl: './mapping-department-to-doctor.component.html',
  styleUrls: ['./mapping-department-to-doctor.component.css']
})
export class MappingDepartmentToDoctorComponent implements OnInit {
  hospitalId: string;
  error: string;
  results: Object;
  doctorId: any;
  departmentId: any = '';
  isLoading = false;
  buttonapprove = 'Skip / Approve';
  isLoadingReject = false;
  buttonreject = 'Reject';
  constructor(private hospitalservice: HospitalService,
     private doctorservice: DoctorService,private router:Router,
    private activaterouter: ActivatedRoute, private toaster: ToastrService) {
    this.activaterouter.params.subscribe(params => {
      console.log(params.id)
      this.doctorId = params.id;
    })
  }

  ngOnInit() {
    this.hospitalId = localStorage.getItem('currentuserId');

    this.getallDepartmentHospital(this.hospitalId);
  }
  getallDepartmentHospital(hospitalId) {
    this.hospitalservice.gelAllDepartment(hospitalId).subscribe(
      data => {
        this.results = data;

      },
      error => {
        this.error = 'No Departments found'
      }
    )
  }

  adddepartmenttodoctor() {
    if(this.departmentId == '')
    {
      this.toaster.error('please choose a department');
      return;
    }
    let req = [{
      "departmentId": this.departmentId,
      "doctorId": this.doctorId
    }]
    console.log(req)
    this. hospitalservice.addDoctorstoDepartmetn(req).subscribe(
      data =>{
        this.skipapprove();
      },
      error =>{

      }
    )
  }

  skipapprove() {
    this.isLoading = true;
    this.buttonapprove = 'Processing';

    let req = {

    }
    this.doctorservice.approveRequest(this.doctorId, req).subscribe(
      data => this.handlerSucess1(data),
      error => this.handlerError1(error)
    )
  }
  handlerSucess1(data) {
    this.isLoading = false;
    this.buttonapprove = 'Approve';
    this.toaster.success('Request Approved')
    this.router.navigate(['/approval-request']);
  
  }
  handlerError1(error) {
    this.isLoading = false;
    this.buttonapprove = 'Approve';
    this.error = error.error['error'];
    if (this.error == 'No data found ') {

    }
    else {
      this.toaster.error('We are getting too many request at the moment. Please try again after some time');

    }
  }
  reject(){
    this.isLoadingReject = true;
    this.buttonreject = 'Processing';
 
    let req ={
  
    }
    this.doctorservice.rejectRequest(this.doctorId,req).subscribe(
      data => this.handlerSucess12(data),
      error => this.handlerError12(error)
    )
    
  }
  handlerSucess12(data){
    this.isLoadingReject = false;
    this.buttonreject = 'Reject';
    this.toaster.success('Request Rejected')
    this.router.navigate(['/approval-request']);
  }
  handlerError12(error){
    this.isLoadingReject = false;
    this.buttonreject = 'Reject';
    this.toaster.error('We are getting too many request at the moment. Please try again after some time')
  }
}
