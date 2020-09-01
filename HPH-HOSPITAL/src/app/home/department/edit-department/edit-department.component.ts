import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/hospital/hospital.service';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/_model/department';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  departmentForm:FormGroup;
  departmentModel:Department;
  submitted = false;
  hospitalId: any;
  error: any;
  departmentId: any;
  constructor(private router:Router,private activaterouter:ActivatedRoute,private formBuilder: FormBuilder, 
    private toaster:ToastrService,private hospitalService:HospitalService) { }

  ngOnInit() {
    this.departmentModel = new Department();

    this.activaterouter.params.subscribe(
      params =>{
        console.log(params)
        this.departmentModel.departmentName = params.departmentName;
        this.departmentId = params.departmentId;
      }
    );
    this.departmentForm = this.formBuilder.group({

      departmentName:['',Validators.required],
    });
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalId = users['hospitalId'];
  }
  get f() { return this.departmentForm.controls; }
  create(){
    this.submitted = true; 

    if (this.departmentForm.invalid) {
      return;
    }
    else if (this.departmentForm.valid){
      let req = {
        "hospitalId":this.hospitalId,
        "departmentId":this.departmentId,
        "departmentName":this.departmentModel.departmentName
      }
      this.hospitalService.updateDepartmentName(req).subscribe(
        data =>{
          this.toaster.success('Department Update Successfully');
          this.router.navigate(['/department']);
        },
        error =>{
          this.error = error.error['error'];
          this.toaster.error(this.error)
        }
      )
    }
  }
}
