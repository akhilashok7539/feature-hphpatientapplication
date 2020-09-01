import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HealthHistory } from 'src/app/_models/healthHistory';
import { UserService } from '../../user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-health-history',
  templateUrl: './add-health-history.component.html',
  styleUrls: ['./add-health-history.component.css']
})
export class AddHealthHistoryComponent implements OnInit {
  public imagePath;
  imgURL: any;
  selectedFile: File
  message: string;
  currentFoto: any;
  files: any;
  button = 'Submit';
  editHealth: FormGroup;
  isLoading = false;

  public healthhistoryModel: HealthHistory;
  patientId: any;
  formData = new FormData();
  healthId: any;


  constructor(private formbuilder: FormBuilder,public dialogRef: MatDialogRef<AddHealthHistoryComponent>,
     private userservice: UserService, private toaster: ToastrService) {
    this.healthhistoryModel = new HealthHistory();

  }

  ngOnInit() {
    this.editHealth = this.formbuilder.group({
      testName: ['', Validators.required],
      testDescription: ['', Validators.required],
      dateofTest: ['', Validators.required],
    });
  }
  addIdProof(event) {

    this.files = event.target.files;
    this.currentFoto = this.files.item(0);

    //  console.log(this.currentFoto)
  }

  submit() {
    this.isLoading = true;
    this.button = "Processing";
    const users = JSON.parse(localStorage.getItem('currentPatient'));
    this.patientId = users['patientId'];
    console.log(this.currentFoto)
    this.formData.append('healthRecordFile', this.currentFoto);
    console.log(this.formData)
    this.userservice.uploadhealthhistory(this.formData, this.patientId).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )

  }
  handlerSucess(data) {
    this.isLoading = true;
    this.button = "Processing";
    this.healthId = data['healthId'];
    // alert('file uploaded')
    // this.toaster.success('Document added successfully')
    this.addDocDetails();
  }

  addDocDetails() {
  
    if(this.healthhistoryModel.testName == null)
    {
      this.isLoading = false;
      this.button = "Submit";
      this.toaster.error('Please enter the test name');
      return;

    }
    if(this.healthhistoryModel.testDescription == null)
    {
      this.isLoading = false;
      this.button = "Submit";
      this.toaster.error('Please enter the test description');
      return;

    }
    if(this.healthhistoryModel.dateofTest == null)
    {
      this.isLoading = false;
      this.button = "Submit";
      this.toaster.error('Please choose a date');
      return;

    }
    let req = {
      "healthId": this.healthId,
      "isRelative": 0,
      "relativeId": "",
      "testName": this.healthhistoryModel.testName,
      "testDescription": this.healthhistoryModel.testDescription,
      "dateOfTest": this.healthhistoryModel.dateofTest

    }
    this.userservice.addHealthHistoryDetails(req).subscribe(
      data =>{
      this.toaster.success('Document added successfully');
      this.isLoading = false;
      this.button = "Submit";
      this.dialogRef.close();
      },
      error =>{
        this.isLoading = false;
        this.button = "Submit";
        this.toaster.error('Unable to update document');
      }
    )
  }
  handlerError(error) {
    this.isLoading = false;
    this.button = "Submit";
    // this.formData = null;
    this.formData.delete('healthRecordFile');
    // this.currentFoto = null;
    if (this.currentFoto == null) {
      this.toaster.error('Please add documents');
      this.button = "Submit";
    }
    else {
      this.toaster.error('File size exceeded the maximum size');
    }

    //alert('unable to upload files')
  }
  close(){
    this.dialogRef.close();
  }
}
