import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_model/user';
import { HospitalService } from 'src/app/hospital/hospital.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userform:FormGroup;
  departmentModel: User;
  submitted = false;
  profileId = 11;
  designation: any;
  hospitalId: any;
  error: any;
 
  constructor(private fb:FormBuilder,private toaster:ToastrService,private router:Router,
    private hospitalservice:HospitalService) { }

  ngOnInit() {
    this.departmentModel = new User();
    this.departmentModel.destinationId = '';
    this.userform = this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      destinationId:['',Validators.required],
      passoword:['',Validators.required],
    })
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalId = users['hospitalId'];
    this.getallDeigination();
  }
  get f() { return this.userform.controls; }

  create()
  {
    this.submitted = true;
    if (this.userform.invalid) {
      console.log('invalid')

      return;
    }
    else if (this.userform.valid) {
      let req ={
        "profileId":this.profileId,
        "hospitalId":this.hospitalId,
        "designationId":this.departmentModel.destinationId,
        "phone":this.departmentModel.phone,
        "email":this.departmentModel.email,
        "name":this.departmentModel.name,
        "password":this.departmentModel.passoword
      }
      this.hospitalservice.adduser(req).subscribe(
        data =>{
          this.toaster.success("User added successfully");
          this.router.navigate(['/user']);
        },
        error =>{
          this.error = error.error['error']
          console.log(error)
          this.toaster.error(this.error)
        }
      )
    }

  }
  getallDeigination(){
      this.hospitalservice.getalldesignation().subscribe(
        data =>{
          this.designation = data;
        },
        error =>{
          
        }
      )
  }
}
