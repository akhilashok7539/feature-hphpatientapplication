import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-edit-hospital-logo',
  templateUrl: './edit-hospital-logo.component.html',
  styleUrls: ['./edit-hospital-logo.component.css']
})
export class EditHospitalLogoComponent implements OnInit {
  public imagePath;
  imgURL: any;
  selectedFile: File
  public message: string;
  doctorId:any;
  currentFoto: any;
  files: any;
  hospitalId:any;
  formData = new FormData();
  error: any;
  isLoading = false;
  button = 'Next';
  constructor(private _activatedRoute:ActivatedRoute,
    private toaster:ToastrService,
    private _router: Router,private hospitalService:HospitalService ){ }
  ngOnInit() {
    this.hospitalId = sessionStorage.getItem("hospitalId");
  }
  addIdProof(event) {

    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
    
    //  console.log(this.currentFoto)
  }
  next(){
    if(this.currentFoto == null){
      this.toaster.error('Please Upload a document');
      return;
    }
    this.isLoading = true;
    this.button = 'Processing';
    console.log(this.currentFoto)
    this.formData.append('logo',this.currentFoto);
    console.log(this.formData)
    this.hospitalService.uploadlogo(this.formData,this.hospitalId).subscribe(
    data =>this.handlersucess(data),
    error => this.handlerError(error)
    )
    
  }
  handlersucess(data){
    this.toaster.success('Hospital logo updated successfully');
    this._router.navigate(['/edit-owner-id']);
  }
  handlerError(error){
    this.isLoading = false;
    this.button = 'Next';
    this.formData.delete('proof');
    this.error = error.error['error'];
    if(this.error == 'Missing Data'){
      this.message = 'Please Upload a document';
    }
    else{
      this.message = this.error
      this.toaster.error('file size exceeds there limit');
    }
    
    
  }

}
