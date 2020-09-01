import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Patient } from 'src/app/_models/patient';
import { Booking } from 'src/app/_models/booking';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../booking.service';
import { UserService } from '../../profile/user.service';

@Component({
  selector: 'app-bookedanappointment-section',
  templateUrl: './bookedanappointment-section.component.html',
  styleUrls: ['./bookedanappointment-section.component.css']
})
export class BookedanappointmentSectionComponent implements OnInit {
  bookingFor: any = 'Myself';
  mapdata;
  mapdatas;
  selectedDate;
  selectedTime = [];
  selectedtimesolts: any;
  dates: any;
  timeSlotes = [];
  onDateSelected: string;
  dataArray = [];
  dataresultArray = [];
  doctorid: any;
  bookingStatus = 'PENDING';
  bookingForm: FormGroup;
  profileId = 1;
  profileIdUnReg = 3;
  relativeFielddisable: boolean = false;
  patientId: any;
  date: any;
  time: any;
  isLoading = false;
  button = 'Confirm';
  availableSlotId: any;
  public patientModel: Patient;
  public bookingModel: Booking;
  showLoader: boolean = false;
  messages: string;
  errors: any;
  Relationships: any;
  relatives: any;
  unregPAtientId: any;
  isloggedIn = false;

  constructor(private searchservice: SearchService, public dialog: MatDialog, private formBuilder: FormBuilder,
    private bookingservice: BookingService, private userservice: UserService,
    private _router: Router, private toastr: ToastrService, private dialogRef: MatDialogRef<BookedanappointmentSectionComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.doctorid = data;
    console.log(this.doctorid);
    this.searchservice.getTimeslots(data).subscribe(
      data => this.handlersucesss(data),
      error => this.handlerErrors(error)
      // {
      //   this.timeSlotes = data;
      //   this.mapdata = this.timeSlotes.map;
      //  console.log(this.mapdata)
      // }

    )
    this.patientModel = new Patient();
    this.bookingModel = new Booking();
  }
  ngOnInit() {
    this.selectedDate = '';
    this.selectedtimesolts = '';
    this.getallRelationShips();

    if (this.bookingFor == 'Myself') {
      this.bookingForm = this.formBuilder.group({
        patientId: [],
        date: ['', Validators.required],
        time: ['', Validators.required],
        unregFirstName: ['', Validators.required],
        unregLastName: ['', Validators.required],
        unregMob: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
        check: ['', Validators.required],
        realtionship: ['', Validators.required],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        relativename: ['', Validators.required],

      });
    }
    else if (this.bookingFor == 'Relative') {
      this.bookingForm = this.formBuilder.group({
        patientId: [],
        date: ['', Validators.required],
        time: ['', Validators.required],
        unregFirstName: ['', Validators.required],
        unregLastName: ['', Validators.required],
        unregMob: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
        check: ['', Validators.required],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        relativename: ['', Validators.required],


      });
    }

    const users = JSON.parse(localStorage.getItem('currentPatient'));
    this.patientModel.patientId = users['patientId'];
    console.log(this.patientModel.patientId)
    this.isloggedIn = JSON.parse(sessionStorage.getItem('isLoggedin'));
    if (this.isloggedIn == null) {
      this.isloggedIn = false
    }
  }
  handlersucesss(data) {
    this.timeSlotes = data;
    //console.log(this.timeSlotes)
    // this.dates = Object.keys(this.timeSlotes.map)
    //console.log(this.dates)
    // const datesss = new Date(this.dates)
    // console.log(datesss.toString().slice(0,15))
    this.mapdata = this.timeSlotes.map;
  }
  handlerErrors(error) {
    this.messages = 'No TimeSlots Available For this Doctor'
  }


  getallRelationShips() {
    this.bookingservice.getallRelationships().subscribe(
      data => {
        this.Relationships = data;
      },
      error => {

      }
    )
  }

  checkbox(isChecked: boolean) {
    if (isChecked) {
      console.log('Checked');
      this.relativeFielddisable = true;
      console.log(this.relativeFielddisable)

      const users = JSON.parse(localStorage.getItem('currentPatient'));
      this.patientId = users['patientId'];
      this.userservice.getallrelatives(this.patientId).subscribe(
        data => {
          this.relatives = data;
        },
        error => {
          this.messages = 'No relatives found for this user'
        }
      )


    }
    else if (!isChecked) {
      console.log('unchecked')
      this.relativeFielddisable = false;
      this.bookingModel.unregFirstName = ''
      this.bookingModel.unregLastName = '';
      this.bookingModel.unregMob = '';
      this.bookingModel.realtionship = '';
      this.bookingModel.gender = '';
      this.bookingModel.dob = '';
    }
  }
  dateselected() {
    this.selectedTime = [];
    this.mapdatas = this.timeSlotes.map[this.selectedDate];
    console.log(this.mapdatas)
    console.log(this.mapdatas.length)
    for (let i = 0; i < this.mapdatas.length; i++) {
      this.time = this.mapdatas[i];
      this.selectedtime(this.time);
    }
  }
  selectedtime(time) {
    this.selectedTime.push({
      'timing': time
    });
    console.log(this.selectedTime)
  }
  relativePerson(relative) {
    console.log(relative)
    this.unregPAtientId = relative;
    this.userservice.getUnregPatientDetailsById(relative).subscribe(
      data => {
        this.bookingModel.unregFirstName = data['firstName'];
        this.bookingModel.unregLastName = data['lastName'];
        this.bookingModel.unregMob = data['mobNo']
        this.bookingModel.realtionship = data['relationWithUser'].relationshipId;
        this.bookingModel.gender = data['gender'];
        this.bookingModel.dob = data['dob'];
      },
      error => {

      }
    )
  }
  bookAppointment() {

    if (this.isloggedIn == false) {
      this.toastr.success('Please Login to continue Booking');

    }
    else if (this.isloggedIn == true) {


      if (this.bookingFor == 'Myself') {


        if (this.selectedDate == null && this.selectedtimesolts == null) {
          this.toastr.error('Please choose your date & time');
          return;

        }
        else if (this.selectedtimesolts == null) {
          this.toastr.error('Please choose your time');
          return;
        }
        else {

          this.isLoading = true;
          this.button = 'Processing';
          let req = {
            "profileId": this.profileId,
            "patientId": this.patientModel.patientId,
            "doctorId": this.doctorid,
            "date": this.selectedDate,
            "time": this.selectedtimesolts,
            "bookingStatus": this.bookingStatus
          }
          console.log(req)
          this.bookingservice.bookappointment(req).subscribe(
            data => this.handleSuccessprofile(data),
            error => this.handleErrorprofile(error));
        }
      }
      else if (this.bookingFor == 'Relative') {
        console.log('relative')
        var usernumber = new String(this.bookingModel.unregMob);
        console.log(usernumber.length)
        if (usernumber.length < 9) {
          this.toastr.error('Please enter valid number')
          return;
        }

        this.isLoading = true;
        this.button = 'Processing';
        if (this.relativeFielddisable == true) {
          let req = {
            "doctorId": this.doctorid,
            "patientId": this.patientModel.patientId,
            "profileId": this.profileIdUnReg,
            "date": this.selectedDate,
            "time": this.selectedtimesolts,
            "bookingStatus": this.bookingStatus,
            "unregPatientId": this.unregPAtientId,

            "unregFirstName": this.bookingModel.unregFirstName,
            "unregLastName": this.bookingModel.unregLastName,
            "unregMob": this.bookingModel.unregMob,
            "unregUserRelation": this.bookingModel.realtionship,
            "unreggender": this.bookingModel.gender,
            "unregdob": this.bookingModel.dob,
          }
          this.bookingservice.bookUnregistedAppointment(req).subscribe(
            data => this.handleSuccessprofile(data),
            error => this.handleErrorprofile(error));
        }
        else if (this.relativeFielddisable == false) {
          let req = {
            "doctorId": this.doctorid,
            "patientId": this.patientModel.patientId,
            "profileId": this.profileIdUnReg,
            "date": this.selectedDate,
            "time": this.selectedtimesolts,
            "bookingStatus": this.bookingStatus,
            "unregPatientId": 0,

            "unregFirstName": this.bookingModel.unregFirstName,
            "unregLastName": this.bookingModel.unregLastName,
            "unregMob": this.bookingModel.unregMob,
            "unregUserRelation": this.bookingModel.realtionship,
            "unreggender": this.bookingModel.gender,
            "unregdob": this.bookingModel.dob,
          }
          this.bookingservice.bookUnregistedAppointment(req).subscribe(
            data => this.handleSuccessprofile(data),
            error => this.handleErrorprofile(error));
        }


      }
    }
  }
  handleSuccessprofile(data) {
    this.showLoader = false;
    this.isLoading = false;
    this.button = 'Confirm';
    this.dialogRef.close();
    // this._router.navigate(['/ProfileHome']);
    this.toastr.success('Appointment booked successfully');
  }
  handleErrorprofile(error) {
    // if (error.status === 400) {
    //   this.toastr.error('login and try again');
    // } else {
    //   this.toastr.error('server error try again');
    // }
    this.isLoading = false;
    this.button = 'Confirm';
    this.errors = error.error['error'];
    if (this.errors == 'Missing Data') {
      this.toastr.error('Please fill the details');
    }
    else {
      this.toastr.error(this.errors);
    }
  }
  select(id) {
    this.availableSlotId = id;
    console.log(this.availableSlotId)
  }
  getDateChange(e) {
    console.log(e.target.value);
  }
  cancel(){
    this.dialogRef.close();
  }
}
