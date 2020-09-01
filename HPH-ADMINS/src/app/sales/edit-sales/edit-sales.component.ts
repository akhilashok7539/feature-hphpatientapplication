import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Sales } from 'src/app/_models/sales';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/hospital/hospital.service';

@Component({
  selector: 'app-edit-sales',
  templateUrl: './edit-sales.component.html',
  styleUrls: ['./edit-sales.component.css']
})
export class EditSalesComponent implements OnInit {

  salesForm: FormGroup;
  departmentModel: Sales;
  submitted = false;
  profileId = 10;
  salesPersonId: any;
  constructor(private router: Router, private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute,
     private toaster: ToastrService,private hospitalservice:HospitalService,
   ) {
    this.departmentModel = new Sales();
    // this.departmentModel.gender = '';
    this.activatedRoute.params.subscribe(params => {
      console.log(params.salesId)
     this.salesPersonId= params.salesId;
     this.departmentModel.salesPersonFirstName = params.firstName;
     this.departmentModel.salesPersonLastName = params.lastName;
     this.departmentModel.phone = params.phone;
     this.departmentModel.email = params.email;
     this.departmentModel.dob = params.dob;
     this.departmentModel.gender = params.gender;
    
    
});
  }
  ngOnInit() {
    
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
        "salesId":this.salesPersonId,
        "profileId": this.profileId,
        "salesPersonFirstName": this.departmentModel.salesPersonFirstName,
        "salesPersonLastName": this.departmentModel.salesPersonLastName,
        "phone": this.departmentModel.phone,
        "email": this.departmentModel.email,
        "dob": this.departmentModel.dob,
        "gender": this.departmentModel.gender
      }
      this.hospitalservice.updateSales(req).subscribe(
        data => { 
          this.toaster.success('Sales update sucessfully');
          this.router.navigate(['/sales']);
        },
        error =>{
          this.toaster.error(error.error.error);
        }
      )
    }
  }
}
