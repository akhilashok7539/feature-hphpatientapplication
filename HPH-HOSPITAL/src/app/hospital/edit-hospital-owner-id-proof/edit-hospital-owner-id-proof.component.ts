import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-edit-hospital-owner-id-proof',
  templateUrl: './edit-hospital-owner-id-proof.component.html',
  styleUrls: ['./edit-hospital-owner-id-proof.component.css']
})
export class EditHospitalOwnerIdProofComponent implements OnInit {

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
  button = 'Complete Profile';

  constructor(  private toaster:ToastrService,
    private router: Router,private hospitalService:HospitalService) { }
  ngOnInit() {
  }

  
  addOwnerIdproof(event){
    
    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
  }
  upload(){
    this.isLoading = true;
    this.button = 'Processing';
    if(this.currentFoto == null){
      this.toaster.error('Please add a document');
      return;
    }
    let userId = localStorage.getItem("currentuserId");
    console.log(this.currentFoto)
    this.formData.append('proof',this.currentFoto);
    console.log(this.formData)
    this.hospitalService.updateOwnerIdproof(this.formData,userId).subscribe(
    data =>this.handlersucess(data),
    error => this.handlerError(error)
    )
    // 
  }
  handlersucess(data){
    this.toaster.success('Owner ID proof added successfully');
    // this.router.navigate(['/Verificationpage']);
    this.completeProfile();
  }

  handlerError(error){
    this.isLoading = false;
    this.button = 'Complete Profile';
    this.formData.delete('proof');
    this.error = error.error['error'];
    if(this.currentFoto == null){
      this.toaster.error('Please add a document');
    }
    else {
      this.toaster.error('File size exceeds their limit');
    }
   
  }



  completeProfile(){
    this.isLoading = true;
    this.button = 'Processing';
    let userId = localStorage.getItem("currentuserId");
    this.hospitalService.getapprovebyadmin(userId).subscribe(
      data => this.handlerdata(data),
      error =>this.handlererror(error)
    )
  }
  handlerdata(data){
    this.isLoading = false;
    this.button = 'Complete Profile';
    console.log(data)
    this.router.navigate(['/verification']);
    // this.messages = 'Your account is under review'
    this.toaster.success('Your account is under review');
    
  }
  handlererror(error){
    this.isLoading = false;
    this.button = 'Complete Profile';
    this.toaster.error('Network is busy at this moment.please try after some time.Thank you !')
    console.log(error)
  }
}
