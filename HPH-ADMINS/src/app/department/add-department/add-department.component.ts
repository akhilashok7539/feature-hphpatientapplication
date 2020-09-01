import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/_models/department';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  loading: boolean;
  speciality = [];
  city =[];
  submitted = false;
  departments=[];
  doctorId:any;
  departmentForm :FormGroup;
  public departmentModel:Department;
  error: any;
  constructor(private router:Router,private formBuilder: FormBuilder, private _activatedRoute:ActivatedRoute,
    private departservice:DepartmentService,private toaster:ToastrService
    ) {
    this.departmentModel = new Department();
   }

  ngOnInit() {
    this.departmentForm = this.formBuilder.group({

      departmentName:['',Validators.required]

    });
  }
  get f() { return this.departmentForm.controls; }
  // get departmentName(){
  //   return this.departmentForm.get('departmentName');
  // }
  create(){
    this.submitted = true; 

    if (this.departmentForm.invalid) {
      return;
    }
    else if (this.departmentForm.valid){
    let req ={
      "name":this.departmentModel.departmentName
    }
    console.log(req)
    this.departservice.createDepart(req).subscribe(
      data => this.handlereSucess(data),
      error => this.handerError(error)
    )

  }
}
  handlereSucess(data){
  console.log(data)
  this.toaster.success('Department added successfully')
  // this.toaster.success('Department deleted successfully');
  this.router.navigate(['/department']);
  }
  handerError(error){
  console.log(error)
  this.error = error.error['error'];
  this.toaster.error(this.error)
  }

}
