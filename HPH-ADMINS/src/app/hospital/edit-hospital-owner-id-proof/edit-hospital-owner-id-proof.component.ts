import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HospitalService } from '../hospital.service';
import { DatasharingService } from '../_shared/datasharing.service';
import { ToastrService } from 'ngx-toastr';

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
  button = 'Next';
  constructor(private _activatedRoute:ActivatedRoute,private datasharing:DatasharingService,
    private toaster:ToastrService,
    private router: Router,private hospitalService:HospitalService ){ }

  ngOnInit() {
    let userId = sessionStorage.getItem("hospitalId");
    console.log(userId)
  }

  
  addOwnerIdproof(event){
    
    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
  }
  next(){
    if(this.currentFoto == null){
      this.toaster.error('Please Upload a document');
      return;
    }
    this.isLoading = true;
    this.button = 'Processing';
    let userId = sessionStorage.getItem("hospitalId");
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
    this.toaster.success('Owner ID proof updated sucessfully');
    const status = sessionStorage.getItem("edituserStatus");
    if(status == 'PENDING'){
      this.router.navigate(['/statusChange']);
    }
   else{
      this.router.navigate(['/Hospital']);
   }
    // this.router.navigate(['/editpassword']);
  }
  handlerError(error){
    this.isLoading = false;
    this.button = 'Next';
    this.formData.delete('proof');
    this.error = error.error['error'];
    this.toaster.error('file size exceeds there limit');
  }

}
