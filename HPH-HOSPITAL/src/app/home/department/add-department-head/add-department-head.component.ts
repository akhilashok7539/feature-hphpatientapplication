import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/hospital/hospital.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-department-head',
  templateUrl: './add-department-head.component.html',
  styleUrls: ['./add-department-head.component.css']
})
export class AddDepartmentHeadComponent implements OnInit {
  hospitalId: any;
  results: any;
  departmentId: any;
  departmentHeadName: any = '';
  constructor(private Hospitalservice: HospitalService, private router:Router,
    private activaterouter: ActivatedRoute, private toaster: ToastrService) {
    this.activaterouter.params.subscribe(
      params => {
        console.log(params)
        this.departmentId = params.departmentId;
      }
    );
  }

  ngOnInit() {

    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalId = users['hospitalId'];
    this.getallActiveDoctors();

  }
  getallActiveDoctors() {
    this.Hospitalservice.getAllActiveDoctors(this.hospitalId).subscribe(
      data => {
        this.results = data;
        console.log(this.results)
      },
      error => {

      }
    )
  }
  adddepartmentHead() {
    let req = {
      "departmentId": this.departmentId,
      "doctorId": this.departmentHeadName
    }
    console.log(req)
    this.Hospitalservice.adddepartmentHead(req).subscribe(
      data => {
        this.toaster.success('Department Head Added Successfully');
        this.router.navigate(['/department'])
      },
      error => {
        this.toaster.error('Server is busy at ths moment');
      }
    )
  }
}
