import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Patient } from 'src/app/_models/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addressdetails',
  templateUrl: './addressdetails.component.html',
  styleUrls: ['./addressdetails.component.css']
})
export class AddressdetailsComponent implements OnInit {
  private showLoader: boolean = false;
  profileId = 1;
  editProfileForm: FormGroup;
  public patientModel: Patient;
  constructor(private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router, private userService: UserService, private toastr: ToastrService) {
    this.patientModel = new Patient();
  }
  ngOnInit() {
    this.viewAddress();
    //  const userAddress = JSON.parse(localStorage.getItem('currentPatientAddress'));
    // console.log(userAddress.address.house)
    const users = JSON.parse(localStorage.getItem('currentPatient'));
    this.patientModel.patientId = users['patientId'];
    // this.patientModel.house  = userAddress.address.house;
    // // console.log( this.patientModel.house )
    // this.patientModel.street =  userAddress.address.street;
    // this.patientModel.state = userAddress.address.state;
    // this.patientModel.city = userAddress.address.city;
    // this.patientModel.country = userAddress.address.country;
    // this.patientModel.pin = userAddress.address.pin;
    this.editProfileForm = this.formBuilder.group({
      patientId: [],
      house: ['', Validators.required],
      street: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', Validators.required]
    });
  }
  viewAddress() {
    const users = JSON.parse(localStorage.getItem('currentPatient'));
    this.patientModel.patientId = users['patientId'];
    let req = {
      "profileId": this.profileId,
      "userId": this.patientModel.patientId,
    };
    this.showLoader = true;
    this.userService.viewAddress(this.patientModel.patientId, this.profileId, req).subscribe(data => this.handleSuccess(data));
  }
  handleSuccess(data) {
    console.log("success");
    console.log(data)
    this.patientModel.house = data.house;
    // console.log(this.patientModel.house)
    // console.log( this.patientModel.house )
    this.patientModel.street = data.street;
    this.patientModel.state = data.state;
    this.patientModel.city = data.city;
    this.patientModel.country = data.country;
    this.patientModel.pin = data.pin;
  }
  // addNewAddress() {
  //   let req = {
  //     "profileId": this.profileId,
  //     "userId": this.patientModel.patientId,
  //     "house": this.patientModel.house,
  //     "city": this.patientModel.city,
  //     "street": this.patientModel.street,
  //     "state": this.patientModel.state,
  //     "country": this.patientModel.country,
  //     "pin": this.patientModel.pin
  //   };
  //   this.userService.addAddress(req).subscribe(
  //     data => this.Success(data),
  //     error => this.handleError(error));
  // }
  // Success(data) {
  //   this.showLoader = false;
  //   console.log(data);
  //   console.log("success");
  //   this._router.navigate(['/ProfileView']);
  //   this.toastr.success('Address added successfully')
  // }
  // handleError(error) {
  //   console.log(error);
  //   this.toastr.error('unable to add user address');
  // }
  updateAddress() {
    let req = {
      "profileId": this.profileId,
      "userId": this.patientModel.patientId,
      "house": this.patientModel.house,
      "city": this.patientModel.city,
      "street": this.patientModel.street,
      "state": this.patientModel.state,
      "country": this.patientModel.country,
      "pin": this.patientModel.pin
    };
    this.userService.updateUserAddress(req).subscribe(
      data => this.handleSuccessprofile(data),
      error => this.handleErrorprofile(error));
  }
  handleSuccessprofile(data) {
    this.showLoader = false;
    console.log(data);
    console.log("success");
    // alert("update succesfully");
    this.toastr.success('Profile update successfully')
  }
  handleErrorprofile(error) {
    console.log(error);
    //alert('Unable to Update');
    this.toastr.error('unable to update');
  }
 
}
