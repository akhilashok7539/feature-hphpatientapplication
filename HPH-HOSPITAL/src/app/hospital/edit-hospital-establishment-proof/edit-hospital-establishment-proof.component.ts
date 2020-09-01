import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from '../hospital.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-hospital-establishment-proof',
  templateUrl: './edit-hospital-establishment-proof.component.html',
  styleUrls: ['./edit-hospital-establishment-proof.component.css']
})
export class EditHospitalEstablishmentProofComponent implements OnInit {
  @Output() nextClickest = new EventEmitter();

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
  constructor(private router:Router,private hospitalservice:HospitalService,private toaster:ToastrService) { }

  ngOnInit() {
    let userId = localStorage.getItem("currentuserId");
    console.log(userId)
  }
  nextRoutes(){
    this.nextClickest.emit();
  }
  addIdProof(event) {

    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
    
    //  console.log(this.currentFoto)
  }

  upload(){
    if(this.currentFoto == null){
      this.toaster.error('Please add a document');
      return;
    }

    let userId = localStorage.getItem("currentuserId");
  
    
    console.log(this.currentFoto)
    this.formData.append('proof',this.currentFoto);
    console.log(this.formData)
    this.hospitalservice.updateIdProof(this.formData,userId).subscribe(
    data =>this.handlersucess(data),
    error => this.handlerError(error)
    )
  }
  handlersucess(data){
    this.toaster.success('Establishment proof added Successfully');
    this.nextRoutes();
    // this.router.navigate(['/hospitalOwnersIdprood']);
  }

  handlerError(error){
    this.formData.delete('proof');
    this.error = error.error['error'];
    if(this.currentFoto == null){
      this.toaster.error('Please add a document');
    }
    else {
      this.toaster.error('File size exceeds their limit');
    }
   
  }
}
