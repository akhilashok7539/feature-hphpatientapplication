import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/_models/doctor';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.css']
})
export class DoctorViewComponent implements OnInit {

  doctorId: any;
  public doctormodel:Doctor;  
  apiUrl :any;
  profileId = 4;
  constructor(private activaterouter:ActivatedRoute,private hospitalservice:HospitalService) { }

  ngOnInit() {
    this.apiUrl = environment.apiUrl;

    this.activaterouter.params.subscribe(params =>{
      console.log(params.id);
      this.doctorId = params.id;

    })
    this.viewprofile(this.doctorId);
  }
  viewprofile(doctorId){
    
    this.hospitalservice.getdocById(this.doctorId).subscribe(
      data =>this.handleSuccess(data),
      error => this.handlerError(error),
      // this.doctorForm.setValue(data);
      // console.log(this.doctorForm)
  
    );
  }
  handleSuccess(data){
    console.log(data);
    console.log("success");
    this.doctormodel= data;
    console.log(this.doctormodel)

    this.doctormodel.firstName = this.doctormodel['firstName'];
    this.doctormodel.lastName = this.doctormodel['lastName'];
    this.doctormodel.dob = this.doctormodel['dob'];
    this.doctormodel.gender = this.doctormodel['gender'];
    this.doctormodel.mobNo = this.doctormodel['mobNo'];
    this.doctormodel.email = this.doctormodel['email'];
    this.doctormodel.specId = this.doctormodel.spec['description'];
    
    this.doctormodel.cityId = this.doctormodel.city['cityName'];
    this.doctormodel.fee = this.doctormodel['fee'];
    this.doctormodel.joiningdate = this.doctormodel['joiningDate'];
    this.doctormodel.hospitalName = this.doctormodel.hospital['hospitalName'];
    
  }
  handlerError(error)
  {
    console.log(error)
  }
  downloadMedicalRegistrationProof(){
    let userId = sessionStorage.getItem("editUserId");  
    this.hospitalservice.downloadMedicalProof(this.doctorId);
  }
  downloadIdproof(){
    let userId = sessionStorage.getItem("editUserId");  
    this.hospitalservice.downloadIdproofDoctor(this.doctorId);
  }


}
