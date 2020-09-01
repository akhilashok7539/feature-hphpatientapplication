import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/_models/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/department/department.service';
import { DatasharingService } from '../_shared/datasharing.service';
import { HospitalService } from '../hospital.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.css']
})
export class EditHospitalComponent implements OnInit {

  citys:any;
  loading: boolean;
  // hospitalId=1;
  submitted = false;
  profileId=6;
  speciality = [];
  city =[];
  doctorDetails =[];
  uId:any;
  public doctor:Doctor;
  doctorId:any;
  hospitalForm :FormGroup;
  public doctormodel:Doctor;
  constructor(private router:Router,private departService:DepartmentService,
    private formBuilder: FormBuilder,private datasharing:DatasharingService,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private _router: Router,private hospitalservice:HospitalService) {
    this.doctormodel =new Doctor();
   }

  ngOnInit() {

    let userId = sessionStorage.getItem("hospitalId");
    console.log(userId)
    
    this.hospitalservice.getCity().subscribe(
      data =>{
      this.citys =data; 
      console.log(this.citys)
    
    })
    
    this.hospitalForm = this.formBuilder.group({


      hospitalName:['',Validators.required],
      phone: ['',[Validators.required,Validators.pattern('[6-9]\\d{9}')]],
      contactName: ['',Validators.required],
      contactPhone: ['',Validators.required],
      contactEmail: ['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      email: ['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
     
      cityId: ['',Validators.required],
      hospitalType: ['',Validators.required],
     
      
      });


  this.viewprofile(+userId);
  }
  get f() { return this.hospitalForm.controls; }
  viewprofile(userId){
    this.hospitalservice.getHospitalById(userId).subscribe(
      data =>this.handleSuccess(data)
    )
  }
  handleSuccess(data){
   this.doctormodel =data;
   this.doctormodel.hospitalName = this.doctormodel['hospitalName'];
   this.doctormodel.email = this.doctormodel['email'];
   this.doctormodel.phone = this.doctormodel['phone'];
   this.doctormodel.contactName = this.doctormodel['contactName'];
   this.doctormodel.contactEmail = this.doctormodel['contactEmail'];
   this.doctormodel.contactPhone = this.doctormodel['contactPhone'];
   this.doctormodel.cityId = this.doctormodel.city['cityId'];
   this.doctormodel.hospitalType = this.doctormodel['hospitalType'];


  }
  update(){
    this.submitted = true; 

    if (this.hospitalForm.invalid) {
      return;
    }
    else if (this.hospitalForm.valid){
    let userId = sessionStorage.getItem("hospitalId");

    let req = {
      "profileId": this.profileId,
      "cityId": this.doctormodel.cityId,
      "hospitalName": this.doctormodel.hospitalName,
      "phone": this.doctormodel.phone,
      "email": this.doctormodel.email,
      "contactName": this.doctormodel.contactName,
      "contactPhone": this.doctormodel.contactPhone,
      "contactEmail":this.doctormodel.contactEmail,
      "hospitalType": this.doctormodel.hospitalType
    }
    console.log(req)
    this.hospitalservice.updateDoctor(req,userId).subscribe(
      data => this.dataSucess(data),
      error => this.dataError(error)
    )
    }
  // this.router.navigate(['/editAddress']);
  }
  dataSucess(data){
    this.toaster.success('Basic details updated successfully');
    this.router.navigate(['/editAddress']);
  }
  dataError(error){
    this.toaster.error('Cannot update Hospital');
  }
}
