import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/_model/doctor';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-edit-location-details',
  templateUrl: './edit-location-details.component.html',
  styleUrls: ['./edit-location-details.component.css']
})
export class EditLocationDetailsComponent implements OnInit {
  DoctorId: any;
  view = false;
  updateDoctorForm: FormGroup;
  loading: boolean;
  // hospitalId=1;
  submitted = false;
  profileId = 4;
  doctorId: any;
  userId: number;
  public doctormodel: Doctor;
  error: any;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router, private doctorservice: DoctorService) {
    this.doctormodel = new Doctor();
  }


  ngOnInit() {
    this.DoctorId = JSON.parse(sessionStorage.getItem('editUserId'));
    console.log(this.DoctorId)
    let userId = sessionStorage.getItem("editUserId");
    console.log(userId)

    this.updateDoctorForm = this.formBuilder.group({
      houseName: ['', Validators.required],
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],

    });
    this.updateDoctorForm.disable();

    this.viewProfileAddress();
  }
  get f() { return this.updateDoctorForm.controls; }
  viewProfileAddress() {
    let userId = sessionStorage.getItem("editUserId");
    console.log(+userId)


    let req = {
      "profileId": this.profileId,
      "userId": +userId

    }
    console.log(req)
    this.doctorservice.getDocAddressById(this.profileId, userId, req).subscribe(
      data => this.handleSuccess(data)
      // this.doctorForm.setValue(data);
      // console.log(this.doctorForm)

    );
  }
  handleSuccess(data) {

    console.log(data);
    console.log("success");
    this.doctormodel = data;
    console.log(this.doctormodel)

    this.doctormodel.houseName = this.doctormodel['house'];
    this.doctormodel.streetName = this.doctormodel['street'];
    //this.doctormodel.streetName = this.doctormodel['street'];
    this.doctormodel.pincode = this.doctormodel['pin'];


  }
  next() {
    let userId = sessionStorage.getItem("editUserId");
    // var x = userId;
    // var y = +x;
    // console.log(y)
    let req = {
      "profileId": this.profileId,
      "userId": userId,
      "house": this.doctormodel.houseName,
      "street": this.doctormodel.streetName,
      "city": this.doctormodel.city,
      "location": this.doctormodel.location,
      "state": this.doctormodel.state,
      "country": this.doctormodel.country,
      "pin": this.doctormodel.pincode
    }
    console.log(req)
    this.doctorservice.updateDoctorAddress(req).subscribe(
      data => this.handlerSucess1(data),
      error => this.handlerDataError(error)
    )
  }
  handlerSucess1(data) {
    // this.router.navigate(['/update-qualification']);
    // console.log(data)
    this.view = false;

    // alert('upated')
    this.updateDoctorForm.disable();
    this.toaster.success('Location Details updated successfully');
  }
  handlerDataError(error) {
    this.error = error.error['error'];
    // console.log(this.error)
    this.toaster.error(this.error);
  }
  edit() {
    this.view = true;
    this.updateDoctorForm.enable();
  }
}
