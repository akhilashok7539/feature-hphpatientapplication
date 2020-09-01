import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Patient } from 'src/app/_models/patient';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-personal-detials',
  templateUrl: './personal-detials.component.html',
  styleUrls: ['./personal-detials.component.css']
})
export class PersonalDetialsComponent implements OnInit {
  editProfileForm: FormGroup;
  patientId: any;
  public patientModel: Patient;
  profileForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private _router: Router, private userService: UserService,
    private toaster: ToastrService) {
   
    this.patientModel = new Patient();
    this.patientModel.gender = '';
  }

  ngOnInit() {
    
    const users = JSON.parse(localStorage.getItem('currentPatient'));
    // console.log(users)
    this.patientModel.patientId = users['patientId'];
    this.patientModel.firstName = users['firstName'];
    this.patientModel.lastName = users['lastName'];
    this.patientModel.mobNo = users['mobNo'];
    this.patientModel.dob = users['dob'];
    this.viewprofile();
    this.editProfileForm = this.formBuilder.group({
      patientId: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobNo: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }
  viewprofile() {
    this.userService.viewprofile(this.patientModel.patientId).subscribe(
      data => this.handleSuccess(data)
    );
  }
  handleSuccess(data) {
    console.log("success");
    this.patientModel.data = data;
    //console.log(this.patientModel.data)
    this.patientModel.firstName = this.patientModel.data['firstName'];
    this.patientModel.lastName = this.patientModel.data['lastName'];
    this.patientModel.mobNo = this.patientModel.data['mobNo'];
    this.patientModel.email = this.patientModel.data['email'];
    this.patientModel.gender = this.patientModel.data['gender'];
    this.patientModel.dob = this.patientModel.data['dob'];
  
  }
  update() {
    let req = {
      "patientId": this.patientModel.patientId,
      "firstName": this.patientModel.firstName,
      "lastName": this.patientModel.lastName,
      "gender": this.patientModel.gender,
      "mobNo": this.patientModel.mobNo,
      // "email": this.patientModel.email,
      "dob": this.patientModel.dob
    };
    this.userService.updateUser(this.patientModel.patientId, req).subscribe(
      data => this.handleSuccessprofile(data),
      error => this.handleErrorprofile(error));
  }
  handleSuccessprofile(data) {
    console.log("success");
    // this.patientModel.data = data;
    // console.log(this.patientModel.data)
    // this._router.navigate(['/Profileaddress']);
    // alert("update succesfully");
    this.toaster.success('Update successfully');
  }
  handleErrorprofile(error) {
    console.log(error);
    
    this.toaster.error('Unable to update')
  }
  
   
 


}
