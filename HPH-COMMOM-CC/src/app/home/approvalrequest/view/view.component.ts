import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../patient.service';
import { Doctor } from 'src/app/_model/Doctor';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  DoctorId: any;
  results: any;
  public doctormodel:Doctor;  
  constructor(private patientservice:PatientService) { }

  ngOnInit() {
    this.doctormodel =new Doctor();
    this.DoctorId = JSON.parse(sessionStorage.getItem('editUserId'));
    console.log(this.DoctorId)
    this.patientservice.getdocById(this.DoctorId).subscribe(
      data =>this.handleSuccess(data),
      error => this.handlerError(error)
      // this.doctorForm.setValue(data);
      // console.log(this.doctorForm)
  
    );
  }
  handleSuccess(data){
    this.doctormodel= data;
    console.log(this.doctormodel)
    this.doctormodel.firstName = this.doctormodel['firstName'];
    this.doctormodel.lastName = this.doctormodel['lastName'];
    this.doctormodel.dob = this.doctormodel['dob'];
    this.doctormodel.gender = this.doctormodel['gender'];
    this.doctormodel.mobNo = this.doctormodel['mobNo'];
    this.doctormodel.email = this.doctormodel['email'];
    this.doctormodel.specId = this.doctormodel.spec['description'];
    
    this.doctormodel.cityId = this.doctormodel.city['cityId'];
    this.doctormodel.fee = this.doctormodel['fee'];
    // this.practise = this.doctormodel['privatePratice'];
    this.doctormodel.joiningdate = this.doctormodel['joiningDate'];
    // this.practise = this.doctormodel['privatePratice'];
    // this.privatepracticecity = this.doctormodel['privatePraticeCity'].cityId;
    // this.addressprivatepractice = this.doctormodel['privatePraticeAddress'];
    // this.privatepracticespeciality = this.doctormodel['privatePraticeSpec'].specId;
    // this.privatepracticefees = this.doctormodel['privatePraticeFee'];
  }
  handlerError(error)
  {

  }
  downloadMedicalRegistrationProof(){
    let userId = sessionStorage.getItem("editUserId");
    console.log(userId)
    this.patientservice.downloadMedicalProof(userId);
  }
  IdProof()
  {
    let userId = sessionStorage.getItem("editUserId");
    console.log(userId)
    this.patientservice.downloadIdproofDoctor(userId);

  }
}
