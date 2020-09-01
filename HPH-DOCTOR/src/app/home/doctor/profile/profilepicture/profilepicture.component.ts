import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../doctor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/_model/doctor';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-profilepicture',
  templateUrl: './profilepicture.component.html',
  styleUrls: ['./profilepicture.component.css']
})
export class ProfilepictureComponent implements OnInit {
  view = false;
  pic = false;
  DoctorId: any;
  public imagePath;
  updateMedicalProof = false;
  upadteIdProof = false;
  imgURL: any;
  speciality = [];
  city = [];
  doctorForm: FormGroup;
  public doctormodel: Doctor;
  currentFoto: any;
  files: any;
  medicalRegfiles: any;
  currentmedicalProof: any;
  idproofFiles:any;
  currentIdproof:any;
  formData = new FormData();
  hospitalId: any;
  error: any;
  apiUrl: any;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute, private toaster: ToastrService
    , private doctorservice: DoctorService) {
    this.doctormodel = new Doctor();
    this.apiUrl = environment.apiUrl;
  }


  ngOnInit() {
    this.DoctorId = JSON.parse(localStorage.getItem("currentuserId"));

  }
  editProfilePicture() {
    this.pic = true;
  }
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  addPhoto(event) {

    this.files = event.target.files;
    this.currentFoto = this.files.item(0);

    //  console.log(this.currentFoto)
  }
  updateProfilePicture() {

    let userId = JSON.parse(localStorage.getItem("currentuserId"));
    console.log(userId)
    console.log(this.currentFoto)
    this.formData.append('profPic', this.currentFoto);
    console.log(this.formData)
    this.doctorservice.updatePhoto(this.formData, userId).subscribe(
      data => this.handlersucess(data),
      error => this.handlerError(error),
    )
  }
  handlersucess(data) {
    console.log(data)
    this.pic = false;
    // this._router.navigate(['/confirmTiming']);
    this.toaster.success('Photo updated sucessfully');
  }
  handlerError(error) {
    this.formData.delete('profPic');
    console.log(error)
    this.toaster.error('Cannot Update Photo');
  }

  // MEDICAL REGISTRATION PROOF SECTION
  updateMedical() {
    this.updateMedicalProof = true;
  }
  getMediProof(event) {
    this.medicalRegfiles = event.target.files;
    this.currentmedicalProof = this.medicalRegfiles.item(0);
  }
  upload() {
    if (this.currentmedicalProof == null) {
      this.toaster.error('Please add medical registration proof');
      return;
    }
    let userId = JSON.parse(localStorage.getItem("currentuserId"));
    console.log(userId)
    console.log(this.currentmedicalProof)

    this.formData.append('medProof', this.currentmedicalProof);
    console.log(this.formData)
    this.doctorservice.updateMedicalRegistrationProof(this.formData, userId).subscribe(
      data => this.handlersucess1(data),
      error => this.handlerError1(error)
    )

  }
  handlersucess1(data) {
    this.updateMedicalProof = false;
    this.formData.delete('medProof');
    this.currentmedicalProof = null;
    console.log('success');
    // this.router.navigate(['/update-doctorIdProof']);
    this.toaster.success(' Medical registration proof updated successfully');
  }
  handlerError1(error) {
    this.formData.delete('medProof');
    this.error = error.error['error'];
    // console.log(this.error)
    this.toaster.error(this.error);
  }

  // ID PROOF SECTION

  updateId(){
    this.upadteIdProof = true;
  }
  getdocIdProofFile(event){
    this.idproofFiles = event.target.files;
    this.currentIdproof = this.idproofFiles.item(0);
    console.log(this.currentIdproof)
  }
  uploadIDproof(){
    let userId = JSON.parse(localStorage.getItem("currentuserId"));
    console.log(this.currentIdproof)
    this.formData.append('idProof',  this.currentIdproof);

      console.log(this.formData) 
      this.doctorservice.updateDoctorIdProof(this.formData,userId).subscribe(
      data=>this.handleUploadPicApiRes(data),
      error => this.handlerError2(error)
      )
  }
  handleUploadPicApiRes(data){
    console.log(data)
    this.upadteIdProof = false;
    this.currentIdproof = null;
    this.formData.delete('idProof');
    this.toaster.success(' Owner ID Proof updated successfully');
  }
  handlerError2(error){
    this.formData.delete('idProof');
    this.error = error.error['error'];
      // console.log(this.error)
      this.toaster.error(this.error);
  }

  downloadEstaIdProof(){
    let userId = JSON.parse(localStorage.getItem("currentuserId"));

    this.doctorservice.downloadMedicalProof(userId);
  }
  downloadOwnerIdProof(){
    let userId = JSON.parse(localStorage.getItem("currentuserId"));
    this.doctorservice.downloadIdproofDoctor(userId);

  }
}
