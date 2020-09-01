import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../doctor/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from 'src/app/_model/doctor';

@Component({
  selector: 'app-update-doc-address',
  templateUrl: './update-doc-address.component.html',
  styleUrls: ['./update-doc-address.component.css']
})
export class UpdateDocAddressComponent implements OnInit {

  @Output() nextClick = new EventEmitter();
  loading: boolean;
  values = 1;
  color = 'primary';
  mode = 'determinate';
  value = 24;
  bufferValue = 75;
  // hospitalId=1;
  submitted = false;
  doctorForm :FormGroup;
  profileId = 4;
  doctorId:any;
  // userId:number;
  public doctormodel:Doctor;
  error: any;
  selected;
  message:string;
  // doctorid: 400001;
  constructor(private router:Router,private formBuilder: FormBuilder,
   private toaster:ToastrService,
    private _activatedRoute:ActivatedRoute,
    private doctorservice:DoctorService) {

      // this.dataservice.currentUserId.subscribe(userId =>this.values = userId);
      // console.log(this.values)
      this.doctormodel =new Doctor();
     }


  ngOnInit() {

    this.doctorForm = this.formBuilder.group({
      houseName:['',Validators.required],
      streetName: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      location:['',Validators.required],
      country: ['',Validators.required],
      pincode: ['',Validators.required],
      
    });
    // this.dataservice.currentUserId.subscribe(userId =>this.doctorId = userId);
    this.doctorId= JSON.parse(localStorage.getItem("currentuserId"));
    console.log(this.doctorId)


  }
  get f() { return this.doctorForm.controls; }
  nextRoutes(){
    this.nextClick.emit();
  }
  next(){
    this.submitted = true;


    if (this.doctorForm.invalid) {
      return;
    }
    else if (this.doctorForm.valid){
    let req ={
      "profileId":this.profileId,
      "userId":this.doctorId,
      "house":this.doctormodel.houseName,
      "street":this.doctormodel.streetName,
      "city":this.doctormodel.city,
      "location":this.doctormodel.location,
      "state": this.doctormodel.state,
      "country": this.doctormodel.country,
      "pin":this.doctormodel.pincode
    
    }

    console.log(req)
    this.doctorservice.addAddress(req).subscribe(
      data => this.handlesucess(data),
      error =>this.errorHandler(error)
    )
    }
  }
  
  handlesucess(data){
    this.toaster.success('Location Details Added successfully');
    // this.router.navigate(['/add-qualification']);

    // this.values = this.values +1;
    // console.log(this.values);
    // this.dataservice.changeDoctorId( this.values);
    // sessionStorage.setItem('values',JSON.stringify(this.values));
    // this.router.navigate(['/addDoctor']);
    this.nextRoutes();
    // this.value = this.value +12;
  }
  errorHandler(error){
    this.error = error.error['error'];
    console.log(this.error)
    this.toaster.error(this.error);
  }
  isSelected(index: number) {
    if (this.values == index) {
        return false;
    } else {
        return true;
    }
}

}
