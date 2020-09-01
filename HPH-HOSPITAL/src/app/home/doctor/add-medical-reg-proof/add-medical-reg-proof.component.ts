import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/_model/doctor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-medical-reg-proof',
  templateUrl: './add-medical-reg-proof.component.html',
  styleUrls: ['./add-medical-reg-proof.component.css']
})
export class AddMedicalRegProofComponent implements OnInit {
  @Output() nextClickIdProof = new EventEmitter();

  submitted = false;
  doctorId:any;
  currentFoto: any;
  files: any;
  formData = new FormData();
  doctorIdProofForm:FormGroup;
  public doctormodel:Doctor;
  error: any;
  constructor(private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private formBuilder: FormBuilder
    ,private doctorService:DoctorService ){ 
      this.doctormodel =new Doctor();
    }
  ngOnInit() {
    // this.datasharing.currentUserId.subscribe(userId =>this.doctorId = userId);
    // console.log(this.doctorId)
    this.doctorId= JSON.parse(sessionStorage.getItem("editUserId")) ;

    console.log(this.doctorId)
    this.doctorIdProofForm = this.formBuilder.group({
      medRegProof:['',Validators.required],
    })

  }
  nextRoutes(){
    this.nextClickIdProof.emit();
  }
  get f() { return this.doctorIdProofForm.controls; }
  getMediProof(event){
    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
  }

  upload(){
    this.submitted = true; 
    if(this.currentFoto == null){
      this.toaster.error('Please add medical registration proof');
      return;
    }
    console.log(this.currentFoto)
    this.formData.append('medProof',this.currentFoto );
    console.log(this.formData)
    this.doctorId= JSON.parse(sessionStorage.getItem("editUserId")) ;
    console.log(this.doctorId)
    this.doctorService.uploadMedicalRegProof(this.formData,this.doctorId).subscribe(
     data =>this.handlersucess(data),
     error => this.handlerError(error)
    )
    
    // this.router.navigate(['/Doctor']);
  }
  handlersucess(data){
  console.log('success');
  this.toaster.success(" Medical registration proof added successfully");
  this.nextRoutes();
  // this._router.navigate(['/addTiming']);
  }
  handlerError(error){
    this.formData.delete('medProof');
    this.error = error.error['error'];
    console.log(this.error)
    if(this.error =='Internal Server Error')
    {
      this.toaster.error('File size exceeds there limit');

    }
    //this.toaster.error('Please add Medical registration proof');
  }

}
