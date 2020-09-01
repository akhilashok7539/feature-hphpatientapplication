import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sales } from 'src/app/_models/sales';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/hospital/hospital.service';

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css']
})
export class AddSalesComponent implements OnInit {
  salesForm: FormGroup;
  departmentModel: Sales;
  submitted = false;
  profileId = 10;
  constructor(private router: Router, private formBuilder: FormBuilder,
     private toaster: ToastrService,private hospitalservice:HospitalService,
   ) {
    this.departmentModel = new Sales();
  }
  ngOnInit() {
    this.departmentModel.gender = '';
    this.salesForm = this.formBuilder.group({

      salesPersonFirstName: ['', Validators.required],
      salesPersonLastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],


    });
  }
  get f() { return this.salesForm.controls; }

  create() {
    this.submitted = true;
    if (this.salesForm.invalid) {
      console.log('invalid')

      return;
    }
    else if (this.salesForm.valid) {
      console.log('valid')
      let req = {
        "profileId": this.profileId,
        "salesPersonFirstName": this.departmentModel.salesPersonFirstName,
        "salesPersonLastName": this.departmentModel.salesPersonLastName,
        "phone": this.departmentModel.phone,
        "email": this.departmentModel.email,
        "dob": this.departmentModel.dob,
        "gender": this.departmentModel.gender
      }
      this.hospitalservice.addSales(req).subscribe(
        data => { 
          this.toaster.success('Sales added sucessfully');
          this.router.navigate(['/sales']);
        },
        error =>{
          this.toaster.error(error.error.error);
        }
      )
    }
  }
}
