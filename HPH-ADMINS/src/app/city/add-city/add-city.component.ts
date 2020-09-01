import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DepartmentService } from 'src/app/department/department.service';
import { City } from 'src/app/_models/city';
import { Department } from 'src/app/_models/department';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  loading: boolean;
  submitted = false;
  speciality = [];
  city =[];
  departments=[];
  doctorId:any;
  cityForm :FormGroup;
  public cityModel:Department;
  error: any;
  constructor(private router:Router,private formBuilder: FormBuilder, private _activatedRoute:ActivatedRoute,
    private departservice:DepartmentService,private toaster:ToastrService
    ) {
    this.cityModel = new Department();
   }

  ngOnInit() {
    this.cityForm = this.formBuilder.group({

      cityName:[ '',Validators.required]

    });
  }
  get f() { return this.cityForm.controls; }
 
  create(){

    this.submitted = true; 

    if (this.cityForm.invalid) {
      return;
    }
    else if (this.cityForm.valid){
    let req ={
      "name":this.cityModel.cityName
    }
    console.log(req)
    this.departservice.createCity(req).subscribe(
      data => this.handlereSucess(data),
      error => this.handerError(error)
    )
    }
  }
    handlereSucess(data){
    console.log(data)
    this.toaster.success('City added successfully');
    this.router.navigate(['/city'])
    }
    handerError(error){
    console.log(error)
    this.error = error.error['error'];
    this.toaster.error(this.error)
    }

}
