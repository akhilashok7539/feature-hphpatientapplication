import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatasharingService } from '../_shared/datasharing.service';
import { HospitalService } from '../hospital.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-hospital-est-id-proof',
  templateUrl: './edit-hospital-est-id-proof.component.html',
  styleUrls: ['./edit-hospital-est-id-proof.component.css']
})
export class EditHospitalEstIdProofComponent implements OnInit {
  public imagePath;
  imgURL: any;
  selectedFile: File
  public message: string;
  doctorId:any;
  currentFoto: any;
  hospitalForm :FormGroup;
  files: any;
  hospitalId:any;
  formData = new FormData();
  error: any;
  getfiles:any;
  isLoading = false;
  button = 'Next';
  constructor(private _activatedRoute:ActivatedRoute,private datasharing:DatasharingService,
    private toaster:ToastrService,private formBuilder:FormBuilder,
    private router: Router,private hospitalService:HospitalService ){ }

  ngOnInit() {
    this.getfiles = 'application.pdf';
    let userId = sessionStorage.getItem("hospitalId");
    console.log(userId)
    this.viewestablishMent(userId);
    this.hospitalForm = this.formBuilder.group({
      estRegProof:['',Validators.required]
    });
  }

  viewestablishMent(userId){
    this.hospitalService.getEstIdproof(userId).subscribe(
      data =>this.handlerAddressSucess(data)
      );
  }
  handlerAddressSucess(data){
  console.log(data)
  
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
    let userId = sessionStorage.getItem("hospitalId");
  
    
    console.log(this.currentFoto)
    this.formData.append('proof',this.currentFoto);
    console.log(this.formData)
    this.hospitalService.updateIdProof(this.formData,userId).subscribe(
    data =>this.handlersucess(data),
    error => this.handlerError(error)
    )
    
  }
  handlersucess(data){
    this.toaster.success('Establishment Proof updated sucessfully')
    this.router.navigate(['/edit-logo']);
  }

  handlerError(error){
    this.isLoading = false;
    this.button = 'Next';
    this.formData.delete('proof');
    this.error = error.error['error'];
    this.toaster.error('file size exceeds there limit');
  }
  }
 

