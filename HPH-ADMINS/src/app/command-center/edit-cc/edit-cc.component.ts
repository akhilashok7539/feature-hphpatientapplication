import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommandCenter } from 'src/app/_models/commandcenter';
import { CommandcenterService } from '../commandcenter.service';

@Component({
  selector: 'app-edit-cc',
  templateUrl: './edit-cc.component.html',
  styleUrls: ['./edit-cc.component.css']
})
export class EditCcComponent implements OnInit {
  show: boolean;
  loading: boolean;
  editCCForm :FormGroup;
  profileId=7;
  submitted = false;
  public doctorModel:CommandCenter;
  constructor(private router:Router,private formBuilder: FormBuilder, 
    private _activatedRoute:ActivatedRoute,
    private ccService:CommandcenterService) {
    this.show = false;
    this.doctorModel = new CommandCenter();
   }

  ngOnInit() {
    let userId = sessionStorage.getItem("cmdId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['CC']);
      return;
    }
    console.log(userId)

    this.editCCForm = this.formBuilder.group({

      name:['',Validators.required],
      mobNo:['',[Validators.required,Validators.pattern('[6-9]\\d{9}')]],
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      
    });
    this.viewprofile(+userId);
  }
  get f() { return this.editCCForm.controls; }
  viewprofile(userId){
    this.ccService.getccbyId(+userId).subscribe(
      data =>this.handleSuccess(data)
      // this.doctorForm.setValue(data);
      // console.log(this.doctorForm)
  
    );
  }
  handleSuccess(data){
    this.doctorModel =data;
  
    this.doctorModel.name = this.doctorModel['name'];
    this.doctorModel.email = this.doctorModel['email'];
    this.doctorModel.mobNo = this.doctorModel['mobNo'];
   
   
  }
  update(){
    this.submitted = true; 
    // if(this.doctorModel.name != null && this.doctorModel.mobNo != null && this.doctorModel.email != null){
      
    if (this.editCCForm.invalid) {
      console.log('invalid')
        return;
      }
    else if (this.editCCForm.valid){
     console.log('valid')
   
    let req ={
      "ccName": this.doctorModel.name,
      "mobNo": this.doctorModel.mobNo,
      "email": this.doctorModel.email
    }
    let userId = sessionStorage.getItem("cmdId");
    console.log(req)
    this.ccService.updateCC(req,userId).subscribe(
      data => this.sucessdata(data),
      error => this.dataError(error)
    )
    // }
    // else {

    // }
      }
  }

  sucessdata(data){
    console.log(data)

    this.router.navigate(['/edit-ccPass']);
  // sessionStorage.clear();

  }
  dataError(error){

  }
}

