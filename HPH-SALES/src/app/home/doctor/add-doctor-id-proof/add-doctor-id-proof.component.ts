import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-add-doctor-id-proof',
  templateUrl: './add-doctor-id-proof.component.html',
  styleUrls: ['./add-doctor-id-proof.component.css']
})
export class AddDoctorIdProofComponent implements OnInit {
  doctorIdProofForm: FormGroup;
  currentFoto: any;
  files: any;
  submitted = false;
 
  doctorId:any;
  formData = new FormData();
  userId: any;
  error: any;
  constructor(private router:Router,private toaster:ToastrService,
    private formBuilder: FormBuilder,private doctorservice:DoctorService) { }

  ngOnInit() {
    this.doctorId=sessionStorage.getItem("editUserId");
    console.log(this.doctorId)
    this.doctorIdProofForm = this.formBuilder.group({
      "doctorIdproof": ['',Validators.required]

    });
  }
  get f() { return this.doctorIdProofForm.controls; }
  getdocIdProofFile(event){
    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
    console.log(this.currentFoto)
  }
  upload(){
    this.submitted = true; 
    console.log(this.currentFoto)
    this.formData.append('idProof',  this.currentFoto);

      console.log(this.formData) 
      this.doctorservice.doctorIdProofUpload(this.formData,this.doctorId).subscribe(
      data=>this.handleUploadPicApiRes(data),
      error => this.handlerError(error)
      )
  }
  handleUploadPicApiRes(data){
    console.log(data)
    this.router.navigate(['/add-medicalregproof']);
    this.toaster.success('Doctor ID proof added successfully');
  }
  handlerError(error){
    console.log(error)
    // alert('error')
    this.formData.delete('idProof');
    this.error = error.error['error'];
    console.log(this.error)
    if(this.error == 'Internal Server Error')
    {
      this.toaster.error('File size exceeds there limit');

    }
    else {
      
    }
  }
}
