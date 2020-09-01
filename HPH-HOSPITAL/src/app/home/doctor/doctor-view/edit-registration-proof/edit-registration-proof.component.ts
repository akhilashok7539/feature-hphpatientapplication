import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-edit-registration-proof',
  templateUrl: './edit-registration-proof.component.html',
  styleUrls: ['./edit-registration-proof.component.css']
})
export class EditRegistrationProofComponent implements OnInit {
  updateMedicalProof = false;
  upadteIdProof = false;
  currentFoto: any;
  files: any;

  doctorId:any;
  formData = new FormData();
  userId: any;
  error: any;
  constructor(private router:Router,
   private toaster:ToastrService,
 private doctorservice:DoctorService) { 

    }

  ngOnInit() {
    let userId = sessionStorage.getItem("editUserId");
    console.log(userId)
  }
  updateMedical(){
    this.updateMedicalProof = true;
  }
  
  getMediProof(event){
    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
  }
  
  upload(){
    if(this.currentFoto == null){
      this.toaster.error('Please add medical registration proof');
      return;
    }
    let userId = sessionStorage.getItem("editUserId");
    console.log(userId)
    console.log(this.currentFoto)
   
    this.formData.append('medProof',this.currentFoto );
    console.log(this.formData)
    this.doctorservice.updateMedicalRegistrationProof(this.formData,userId).subscribe(
     data =>this.handlersucess(data),
     error => this.handlerError(error)
    )
    
   
  }
  handlersucess(data){
    this.updateMedicalProof = false;
    this.formData.delete('medProof');
    this.currentFoto = null;
    console.log('success');
    // this.router.navigate(['/update-doctorIdProof']);
    this.toaster.success(' Medical registration proof updated successfully');
  }
  handlerError(error){
    this.formData.delete('medProof');
    this.error = error.error['error'];
    // console.log(this.error)
    if(this.error == 'Internal Server Error')
    {
      this.toaster.error('File size exceeds there limit!');
    }
    else {
      this.toaster.error('invalid document');
    }
  }

  updateId(){
    this.upadteIdProof = true;
  }
  getdocIdProofFile(event){
    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
    console.log(this.currentFoto)
  }
  uploadIDproof(){
    let userId = sessionStorage.getItem("editUserId");
    console.log(this.currentFoto)
    this.formData.append('idProof',  this.currentFoto);


    // this.formData.append('employeeStr', new Blob([JSON.stringify({"doctorId": this.doctorId})], 
    // {
    //     type: "application/json"
    //   }))
      console.log(this.formData) 
      this.doctorservice.updateDoctorIdProof(this.formData,userId).subscribe(
      data=>this.handleUploadPicApiRes(data),
      error => this.handlerError1(error)
      )
  }
  handleUploadPicApiRes(data){
    console.log(data)
    this.upadteIdProof = false;
    this.currentFoto = null;
    this.formData.delete('idProof');
    this.toaster.success(' Owner ID Proof updated successfully');
  }
  handlerError1(error){
    this.formData.delete('idProof');
    this.error = error.error['error'];
      // console.log(this.error)
      // this.toaster.error(this.error);
      if(this.error == 'Internal Server Error')
      {
        this.toaster.error('File size exceeds there limit');
      }
      else {
      this.toaster.error('We are busy at this moment please try again after some time');
     
      }
  }
  downloadMedicalRegistrationProof(){
    let userId = sessionStorage.getItem("editUserId");
    console.log(userId)
    this.doctorservice.downloadMedicalProof(userId);
  }
  IdProof()
  {
    let userId = sessionStorage.getItem("editUserId");
    console.log(userId)
    this.doctorservice.downloadIdproofDoctor(userId);

  }
}
