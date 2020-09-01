import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../doctor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/_model/doctor';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-doc-basic-detials',
  templateUrl: './edit-doc-basic-detials.component.html',
  styleUrls: ['./edit-doc-basic-detials.component.css']
})
export class EditDocBasicDetialsComponent implements OnInit {
  view = false;
  pic = false;
  DoctorId: any;
  public imagePath;
  imgURL: any;
  speciality = [];
  city =[];
  doctorForm :FormGroup;
  public doctormodel:Doctor;  
  currentFoto: any;
  files: any;
  formData = new FormData();
  hospitalId: any;
  error: any;
  apiUrl: any;
  practise: any;
  privatepracticecity: any;
  addressprivatepractice: any;
  privatepracticespeciality: any;
  privatepracticefees: any;
  submitted = false;
  constructor(private router:Router,private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private _router: Router,private doctorservice:DoctorService) {
      this.doctormodel =new Doctor();
      this.apiUrl = environment.apiUrl;
     }

  ngOnInit() {
    this.DoctorId = JSON.parse(sessionStorage.getItem('editUserId'));
    console.log(this.DoctorId)
    let userId = sessionStorage.getItem("editUserId");
    this.doctorservice.getSpeciality().subscribe(
      data=>{
        this.speciality =data;
        console.log( this.speciality)
      })

      this.doctorservice.getCity().subscribe(
        data =>{
        this.city =data; 
        console.log(this.city)
      
      })
      this.doctorForm = this.formBuilder.group({


        firstName:['',Validators.required],
        lastName: ['',Validators.required],
        dob: ['',Validators.required],
        gender: ['',Validators.required],
        mobNo: ['',Validators.required],
        email: ['',Validators.required],
        specId: ['',Validators.required],
        cityId: ['',Validators.required],
        // hospitalId: ['',Validators.required],
        // fee: ['',Validators.required],
        // joiningdate:['',Validators.required]
        
        });
        this.doctorForm.disable();
   
        this.viewprofile(+userId);
  }
  editProfilePicture(){
    this.pic = true;
  }
  get f() { return this.doctorForm.controls; }

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
  updateProfilePicture(){

    let userId = sessionStorage.getItem("editUserId");
    console.log(userId)
    console.log(this.currentFoto)
    this.formData.append('profPic',this.currentFoto );
    console.log(this.formData)
    this.doctorservice.updatePhoto(this.formData,userId).subscribe(
     data =>this.handlersucess(data),
     error => this.handlerError(error),
   )
  }

  handlersucess(data){
    console.log(data)
    this.pic = false;
    // this._router.navigate(['/confirmTiming']);
    this.toaster.success('Photo updated sucessfully');
  }
  handlerError(error){
    this.formData.delete('profPic');
    console.log(error)
    this.toaster.error('Cannot Update Photo');
  }
  viewprofile(userId){
    
    this.doctorservice.getdocById(+userId).subscribe(
      data =>this.handleSuccess(data)
      // this.doctorForm.setValue(data);
      // console.log(this.doctorForm)
  
    );
  }
  handleSuccess(data){
    console.log(data);
    console.log("success");
    this.doctormodel= data;
    console.log(this.doctormodel)

    this.doctormodel.firstName = this.doctormodel['firstName'];
    this.doctormodel.lastName = this.doctormodel['lastName'];
    this.doctormodel.dob = this.doctormodel['dob'];
    this.doctormodel.gender = this.doctormodel['gender'];
    this.doctormodel.mobNo = this.doctormodel['mobNo'];
    this.doctormodel.email = this.doctormodel['email'];
    this.doctormodel.specId = this.doctormodel.spec['specId'];
    
    this.doctormodel.cityId = this.doctormodel.city['cityId'];
    this.doctormodel.fee = this.doctormodel['fee'];
    this.practise = this.doctormodel['privatePratice'];
    this.doctormodel.joiningdate = this.doctormodel['joiningDate'];
    this.practise = this.doctormodel['privatePratice'];
    this.privatepracticecity = this.doctormodel['privatePraticeCity'].cityId;
    this.addressprivatepractice = this.doctormodel['privatePraticeAddress'];
    this.privatepracticespeciality = this.doctormodel['privatePraticeSpec'].specId;
    this.privatepracticefees = this.doctormodel['privatePraticeFee'];
  }
  edit(){
    this.view = true;
    this.doctorForm.enable();
  }
  save()
  {
    this.submitted = true; 

    const users = JSON.parse(localStorage.getItem('CurrentHospital'));

    this.hospitalId = users['hospitalId'];
    console.log(this.hospitalId)
    let userId = sessionStorage.getItem("editUserId");
    let req ={
      "doctorId":userId,
      "firstName":this.doctormodel.firstName,
      "lastName": this.doctormodel.lastName,
      "dob": this.doctormodel.dob,
      "gender":this.doctormodel.gender,
      "mobNo": this.doctormodel.mobNo,
      "email":this.doctormodel.email,
     
      "isPrivatePratice":this.practise,
      "privatePraticeCityId":this.privatepracticecity,
      "privatePraticeAddress":this.addressprivatepractice,
      "privatePraticeSpecId":this.privatepracticespeciality,
      "privatePraticeFee":this.privatepracticefees,
      "hosiptalList":[
        {
          "specId": this.doctormodel.specId,
          "cityId": this.doctormodel.cityId,
          "hospitalId":this.hospitalId,
          "fee": this.doctormodel.fee,
          "joiningDate":this.doctormodel.joiningdate
        }
      ]
    }
    this.doctorservice.updateDoc(req).subscribe(
      data => this.handlesucess(data),
      error =>this.errorHandler(error)
    )
  }
  handlesucess(data){
    // this.router.navigate(['/update-Address']);
    this.toaster.success('Basic Details updated successfully');
    this.view = false;
    this.doctorForm.disable();

  }
  errorHandler(error){
    this.error = error.error['error'];
    // console.log(this.error)
    this.toaster.error(this.error);
    
  
  }
}
