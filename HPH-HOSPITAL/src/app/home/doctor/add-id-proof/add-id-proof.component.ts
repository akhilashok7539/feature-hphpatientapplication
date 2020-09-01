import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-id-proof',
  templateUrl: './add-id-proof.component.html',
  styleUrls: ['./add-id-proof.component.css']
})
export class AddIdProofComponent implements OnInit {
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
    this.doctorId= JSON.parse(sessionStorage.getItem("editUserId")) ;

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
      this.doctorId= JSON.parse(sessionStorage.getItem("editUserId")) ;
      console.log(this.doctorId)
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
    if(this.error =='Internal Server Error')
    {
      this.toaster.error('File size exceeds there limit');

    }
  }
}
