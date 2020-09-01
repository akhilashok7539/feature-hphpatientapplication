import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from '../hospital.service';
import { DatasharingService } from '../_shared/datasharing.service';

@Component({
  selector: 'app-add-hospital-logo',
  templateUrl: './add-hospital-logo.component.html',
  styleUrls: ['./add-hospital-logo.component.css']
})
export class AddHospitalLogoComponent implements OnInit {
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
  constructor(private _activatedRoute:ActivatedRoute,private datasharing:DatasharingService,
    private toaster:ToastrService,
    private _router: Router,private hospitalService:HospitalService ){ }
  ngOnInit() {
    this.datasharing.currentUserId.subscribe(userId =>this.hospitalId = userId);
    console.log(this.hospitalId)
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
    this.toaster.success('Hospital logo added successfully');
    this._router.navigate(['/ownerIdProof']);
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
