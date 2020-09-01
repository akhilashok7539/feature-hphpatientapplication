import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/_models/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  submitted = false;
  doctorForm :FormGroup;
  profileId = 4;
  doctorId:any;
  public doctormodel:Doctor;
  error: any;
  selected;
  message:string;

  constructor(private router:Router,private formBuilder: FormBuilder,private doctorservice:DoctorService,
    private toaster:ToastrService) { }

  ngOnInit() {
    this.doctormodel =new Doctor();
    this.doctorForm = this.formBuilder.group({
      houseName:['',Validators.required],
      streetName: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      location:['',Validators.required],
      country: ['',Validators.required],
      pincode: ['',Validators.required],
      
    });
    this.doctorId= JSON.parse(sessionStorage.getItem("editUserId")) ;
    console.log(this.doctorId)
  }
  get f() { return this.doctorForm.controls; }
  next(){
    this.doctorId= JSON.parse(sessionStorage.getItem("editUserId")) ;
    console.log(this.doctorId)
    this.submitted = true;


    if (this.doctorForm.invalid) {
      return;
    }
    else if (this.doctorForm.valid){
    let req ={
      "profileId":this.profileId,
      "userId":this.doctorId,
      "house":this.doctormodel.houseName,
      "street":this.doctormodel.streetName,
      "city":this.doctormodel.city,
      "location":this.doctormodel.location,
      "state": this.doctormodel.state,
      "country": this.doctormodel.country,
      "pin":this.doctormodel.pincode
    
    }

    console.log(req)
    this.doctorservice.addAddress(req).subscribe(
      data => this.handlesucess(data),
      error =>this.errorHandler(error)
    )
    }
  }
  
  handlesucess(data){
    this.toaster.success('Location Details Added successfully');
    this.router.navigate(['/add-qualification']);

  }
  errorHandler(error){
    this.error = error.error['error'];
    console.log(this.error)
    this.toaster.error(this.error);
  }
}
