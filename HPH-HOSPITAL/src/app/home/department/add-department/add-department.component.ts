import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from 'src/app/_model/department';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/hospital/hospital.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  departmentForm:FormGroup;
  departmentModel:Department;
  submitted = false;
  hospitalId: any;
  error: any;

  constructor(private router:Router,private formBuilder: FormBuilder, 
   private toaster:ToastrService,private hospitalService:HospitalService) { }

  ngOnInit() {
    this.departmentModel = new Department();
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
        "departmentName":this.departmentModel.departmentName
      }
      this.hospitalService.addDepartment(req).subscribe(
        data =>{
          this.toaster.success('Department added successfully');
          this.router.navigate(['/department'])
        },
        error =>{
          this.error = error.error['error'];
          this.toaster.error(this.error)
        }
      )
    }
  }
}
