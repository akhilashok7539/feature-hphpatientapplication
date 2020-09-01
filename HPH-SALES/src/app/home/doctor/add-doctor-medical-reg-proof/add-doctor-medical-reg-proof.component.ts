import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/_models/doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-add-doctor-medical-reg-proof',
  templateUrl: './add-doctor-medical-reg-proof.component.html',
  styleUrls: ['./add-doctor-medical-reg-proof.component.css']
})
export class AddDoctorMedicalRegProofComponent implements OnInit {
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
    ,private router: Router,private doctorService:DoctorService ){ 
      this.doctormodel =new Doctor();
    }

  ngOnInit() {
    this.doctorId=sessionStorage.getItem("editUserId");
    console.log(this.doctorId)
    this.doctorIdProofForm = this.formBuilder.group({
      medRegProof:['',Validators.required],
    })

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
    this.doctorService.uploadMedicalRegProof(this.formData,this.doctorId).subscribe(
     data =>this.handlersucess(data),
     error => this.handlerError(error)
    )
    
    // this.router.navigate(['/Doctor']);
  }
  handlersucess(data){
    console.log('success');
    this.toaster.success(" Medical registration proof added successfully");
    this.router.navigate(['/add-photo']);
    }
    handlerError(error){
      this.formData.delete('medProof');
      this.error = error.error['error'];
      console.log(this.error)
      //this.toaster.error('Please add Medical registration proof');
      if(this.error == 'Internal Server Error')
      {
        this.toaster.error('File size exceeds there limit');
  
      }
      else {
      this.toaster.error('We are busy at this moment! please try again later');
        
      }
    }
}
