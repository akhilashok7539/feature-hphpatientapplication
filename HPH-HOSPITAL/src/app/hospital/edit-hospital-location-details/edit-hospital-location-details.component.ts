import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Doctor } from 'src/app/_model/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from '../hospital.service';
@Component({
  selector: 'app-edit-hospital-location-details',
  templateUrl: './edit-hospital-location-details.component.html',
  styleUrls: ['./edit-hospital-location-details.component.css']
})
export class EditHospitalLocationDetailsComponent implements OnInit {
  @Output() nextClick = new EventEmitter();

  citys:any;
  loading: boolean;
  submitted = false;
  // hospitalId=1;
  profileId=6;
  speciality = [];
  city =[];
  doctorDetails =[];
  uId:any;
  public doctor:Doctor;
  doctorId:any;
  hospitalForm :FormGroup;
  public doctormodel:Doctor;
  hospitalId: any;
  constructor(private router:Router,
    private formBuilder: FormBuilder,private hospitalservice:HospitalService,
    private _activatedRoute:ActivatedRoute,
    private toaster:ToastrService
   ) {
    this.doctormodel =new Doctor();
   }
  ngOnInit() {
    let userId = localStorage.getItem("currentuserId");
    console.log(userId)
    this.hospitalForm = this.formBuilder.group({


      houseName:['',Validators.required],
      streetName: ['',Validators.required],
      district: ['',Validators.required],
      
      state: ['',Validators.required],
      country: ['',Validators.required],
      location: ['',Validators.required],
      pincode: ['',Validators.required],
     
     
      
      });
  }
  nextRoutes(){
    this.nextClick.emit();
  }
  get f() { return this.hospitalForm.controls; }
  next(){
    this.submitted = true; 

    if (this.hospitalForm.invalid) {
      return;
    }
    // else if (this.hospitalForm.valid){
      let userId = localStorage.getItem("currentuserId");
    console.log(userId)
    let req ={
      "profileId":this.profileId,
      "userId":userId,
      "house":this.doctormodel.hospitalName,
      "street":this.doctormodel.streetName,
      "city":this.doctormodel.district,
      "location":this.doctormodel.location,
      "state": this.doctormodel.state,
      "country": this.doctormodel.country,
      "pin":this.doctormodel.pincode
    }

    console.log(req)
    this.hospitalservice.addAddress(req).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
    }

handlerSucess(data){
  console.log('sucess')
  this.toaster.success('Location details added successfully');
  // this.router.navigate(['/hospital-establishmentId-proof']);
  this.nextRoutes();

}
handlerError(error) 
{
  this.toaster.error('Unable to added Location details');
  console.log(error)
}
   
}
