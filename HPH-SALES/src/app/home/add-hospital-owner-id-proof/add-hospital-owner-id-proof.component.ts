import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from '../hospital.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hospital-owner-id-proof',
  templateUrl: './add-hospital-owner-id-proof.component.html',
  styleUrls: ['./add-hospital-owner-id-proof.component.css']
})
export class AddHospitalOwnerIdProofComponent implements OnInit {
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
  constructor(private _router: Router,private hospitalService:HospitalService,
    private toastr:ToastrService
     ){ }
  ngOnInit() {
    this.hospitalId = sessionStorage.getItem('hospitalId');
  }

  addOwnerIdproof(event){
    
    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
  }
  next(){
    if(this.currentFoto == null){
      this.toastr.error('Please Upload a document');
      return;
    }
    this.isLoading = true;
    this.button = 'Processing';
    console.log(this.currentFoto)
    this.formData.append('proof',this.currentFoto);
    console.log(this.formData)
    this.hospitalService.uploadOwnerIdProof(this.formData,this.hospitalId).subscribe(
    data =>this.handlersucess(data),
    error => this.handlerError(error)
    )
    // 
  }
  handlersucess(data){
    this.toastr.success('Owner Id proof added successfully');
    this._router.navigate(['/statusChange']);
  }
  handlerError(error){
    this.isLoading = false;
    this.button = 'Next';
    this.formData.delete('proof');
    this.error = error.error['error'];
    this.toastr.error('file size exceeds there limit');
  }
}
