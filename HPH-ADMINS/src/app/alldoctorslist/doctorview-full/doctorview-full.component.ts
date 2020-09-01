import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorseviceService } from '../doctorsevice.service';
import { Doctorview } from 'src/app/_models/doctorview';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-doctorview-full',
  templateUrl: './doctorview-full.component.html',
  styleUrls: ['./doctorview-full.component.css']
})
export class DoctorviewFullComponent implements OnInit {
  doctorId: any;
  public doctormodel:Doctorview;  
  apiUrl :any;
  profileId = 4;
  constructor(private activaterouter:ActivatedRoute,private doctorsevice:DoctorseviceService) { }

  ngOnInit() {
    this.apiUrl = environment.apiUrl;

    this.activaterouter.params.subscribe(params =>{
      console.log(params.id);
      this.doctorId = params.id;

    })
    this.viewprofile(this.doctorId);
  }
  viewprofile(userId){
    
    this.doctorsevice.getdocById(+userId).subscribe(
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
    console.log(this.doctormodel.firstName)

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
    this.doctorsevice.downloadMedicalProof(this.doctorId);
  }
  downloadIdproof(){
    let userId = sessionStorage.getItem("editUserId");  
    this.doctorsevice.downloadIdproofDoctor(this.doctorId);
  }
}
