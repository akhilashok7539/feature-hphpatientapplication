import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { Doctor } from 'src/app/_model/doctor';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../../doctor.service';

@Component({
  selector: 'app-update-timeslots',
  templateUrl: './update-timeslots.component.html',
  styleUrls: ['./update-timeslots.component.css']
})
export class UpdateTimeslotsComponent implements OnInit {

  Practise = 'no';
  public doctor: Doctor;
  session2 = false;
  submitted = false;
  error: any;
  doctorId: any;
  doctorForm: FormGroup;
  public doctormodel: Doctor;
   req = [];
  resultsarray: any;
  dataArray = [];
  dataArray1 = [];
  sessiondayssRepat = [];
  data: any;
  errors: any;
  value: any;

  day: any;
  repeatsessiondays = [
    {
      "id": "6",
      "day": "Sunday",

    },

    {
      "id": "0",
      "day": "Monday",
    },
    {
      "id": "1",
      "day": "Tuesday",
    },
    {
      "id": "2",
      "day": "Wednesday",
    },
    {
      "id": "3",
      "day": "Thursday",
    },
    {
      "id": "4",
      "day": "Friday",
    },
    {
      "id": "5",
      "day": "Saturday",
    },
  ]
  constructor(private atp: AmazingTimePickerService, private router: Router, private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute, private toaster: ToastrService,
    private _router: Router, private doctorservice: DoctorService) { }

  ngOnInit() {
    this.doctorId = JSON.parse( localStorage.getItem("currentuserId"));
    console.log(this.doctorId)
    this.day ='';

    this.dataArray.push(this.doctormodel)
    this.doctormodel = new Doctor();
    this.doctormodel.timing = null;
    this.doctormodel.day = '';
    this.doctormodel.timing3 = null;
    this.doctormodel.timing2 = null;
    this.doctormodel.timing4 = null;
    this.doctorForm = this.formBuilder.group({
      timing: ['', Validators.required],
      day: ['', Validators.required],
      timing2: ['', Validators.required],
      timing3: ['', Validators.required],
      timing4: ['', Validators.required],
      interval:['',Validators.required],
      check: ['', Validators.required],
      checkeddays: this.formBuilder.array([]),



    });
  }

  get f() { return this.doctorForm.controls; }


  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }

  onChange(time: string, isChecked: boolean) {
    this.sessiondayssRepat = [];
    const emailFormArray = <FormArray>this.doctorForm.controls.checkeddays;
    if (isChecked) {
      emailFormArray.push(new FormControl(time));
      this.value = emailFormArray['value']
      //console.log(this.value)

      for (let j = 0; j < this.value.length; j++) {
        this.sessiondayssRepat.push(this.value[j]);

      }
      console.log(this.sessiondayssRepat)




    }

    else {
      let index = emailFormArray.controls.findIndex(x => x.value == time)
      emailFormArray.removeAt(index);
    }


    // console.log(emailFormArray)
  }

  changetimeslots(day) {
    this.doctormodel.timing = null;
    this.doctormodel.timing3 = null;
    this.doctormodel.timing2 = null;
    this.doctormodel.timing4 = null;
  }

  addTimeSlots() {
    console.log('hi')
    let arr = [];


    if (this.doctormodel.timing < this.doctormodel.timing2) {

      for (let j = 0; j < this.dataArray.length; j++) {
        if (this.session2 == true) {
          this.req.push(
            {
              "doctorId": this.doctorId,
              "timing": this.doctormodel.timing + '-' + this.doctormodel.timing2,
              "day": this.day,
              "interval":this.doctormodel.interval

            },
            {
              "doctorId": this.doctorId,
              "timing": this.doctormodel.timing3 + '-' + this.doctormodel.timing4,
              "day": this.day,
              "interval":this.doctormodel.interval
            },

          )
        }
        else if (this.session2 == false) {
          this.req.push(
            {
              "doctorId": this.doctorId,
              "timing": this.doctormodel.timing + '-' + this.doctormodel.timing2,
              "day": this.day,
              "interval":this.doctormodel.interval
            }
          )
        }
      }
      let dayarray=[];

      for(let i=0;i<this.sessiondayssRepat.length;i++)
      {
        if(this.session2 == false)
        {
          dayarray.push(
            {
              "doctorId": this.doctorId,
              "timing": this.doctormodel.timing + '-' + this.doctormodel.timing2,
              "day": this.sessiondayssRepat[i],
              "interval":this.doctormodel.interval
            }
          )
        }
        else if(this.session2 == true)
        {
          dayarray.push(
            {
              "doctorId": this.doctorId,
              "timing": this.doctormodel.timing + '-' + this.doctormodel.timing2,
              "day": this.sessiondayssRepat[i],
              "interval":this.doctormodel.interval

            },
            {
              "doctorId": this.doctorId,
              "timing": this.doctormodel.timing3 + '-' + this.doctormodel.timing4,
              "day": this.sessiondayssRepat[i],
              "interval":this.doctormodel.interval
            },
          )
        }
       
      }
      console.log(dayarray)
      
      arr.push(this.req);
      // arr.push(this.dataArray);
      this.resultsarray = arr['0'];
      
      console.log(this.req)
      for(let k =0;k<dayarray.length;k++)
      {
        this.resultsarray.push(dayarray[k])
      }
      
      this.toaster.success('Timeslots added successfully');
      this.error = null;
      this.sessiondayssRepat = [];

      this.dataArray = [];
      this.doctormodel = new Doctor()
      this.dataArray.push(this.doctormodel);
      this.doctormodel.timing = null;
      this.day = null;
      this.doctormodel.timing3 = null;
      this.doctormodel.timing2 = null;
      this.doctormodel.timing4 = null;
    }


    else {
      this.toaster.warning('Please enter a valid time slots');
    }
  }

  next() {

    console.log(this.req)
    this.doctorservice.addTiming(this.req).subscribe(
      data => this.handlesucess(data),
      error => this.handleError2(error)
    )


  }
  handlesucess(data) {

    this.toaster.success('Timeslots updated successfully');

    this._router.navigate(['/profile']);
    // this.nextRoutes();
  }
  handleError2(error) {
    //this.toaster.success(this.error);  
    this.error = error.error['error'];
    if (this.error == 'Missing Data') {
      this.errors = 'Please add atleast 1 time slots';
      this.toaster.warning('Please add atleast 1 time slots');
    }
    //this.toaster.error(this.error);
  }
  removeItem(i: number): void {
    this.resultsarray.splice(i, 1);
  }
  addSession() {
    this.session2 = true;
  }

}
