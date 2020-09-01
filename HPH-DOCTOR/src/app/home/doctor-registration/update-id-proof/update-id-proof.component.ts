import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor/doctor.service';
@Component({
  selector: 'app-update-id-proof',
  templateUrl: './update-id-proof.component.html',
  styleUrls: ['./update-id-proof.component.css']
})
export class UpdateIdProofComponent implements OnInit {
  @Output() nextClickSymptoms = new EventEmitter();

  doctorIdProofForm: FormGroup;
  currentFoto: any;
  files: any;
  submitted = false;
 
  doctorId:any;
  formData = new FormData();
  userId: any;
  error: any;
  constructor(private router:Router,private toaster:ToastrService,
    private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,private doctorservice:DoctorService) { }

  ngOnInit() {
    // this.dataservice.currentUserId.subscribe(userId =>this.doctorId = userId);
    // console.log(this.doctorId)
    this.doctorId=JSON.parse(localStorage.getItem("currentuserId"));
    console.log(this.doctorId)
    this.doctorIdProofForm = this.formBuilder.group({
      "doctorIdproof": ['',Validators.required]

    });

  }
  nextRoutes(){
    this.nextClickSymptoms.emit();
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


    // this.formData.append('employeeStr', new Blob([JSON.stringify({"doctorId": this.doctorId})], 
    // {
    //     type: "application/json"
    //   }))
      console.log(this.formData) 
      this.doctorservice.doctorIdProofUpload(this.formData,this.doctorId).subscribe(
      data=>this.handleUploadPicApiRes(data),
      error => this.handlerError(error)
      )
  }
  handleUploadPicApiRes(data){
    console.log(data)
    this.nextRoutes();
    this.toaster.success('Doctor ID proof added successfully');
  }
  handlerError(error){
    console.log(error)
    // alert('error')
    this.formData.delete('idProof');
    this.error = error.error['error'];
    console.log(this.error)
    this.toaster.error(this.error);
  }
}
