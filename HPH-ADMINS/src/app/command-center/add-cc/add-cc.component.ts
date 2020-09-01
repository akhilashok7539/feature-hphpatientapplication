import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/_models/doctor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommandcenterService } from '../commandcenter.service';
import { CommandCenter } from 'src/app/_models/commandcenter';
import { MustMatch } from '../../_helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-cc',
  templateUrl: './add-cc.component.html',
  styleUrls: ['./add-cc.component.css']
})
export class AddCcComponent implements OnInit {
  show: boolean;
  submitted = false;
  loading: boolean;
  commandCenterForm :FormGroup;
  profileId=12;
  public doctorModel:CommandCenter;
  error: any;
  constructor(private router:Router,private formBuilder: FormBuilder, 
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private ccService:CommandcenterService) { 
    this.show = false;
    this.doctorModel = new CommandCenter();
  }

  ngOnInit() {
    this.commandCenterForm = this.formBuilder.group({

      name:['',Validators.required],
      // mobNo:['',[Validators.required,Validators.pattern('[6-9]\\d{9}')]],
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['',[Validators.required, Validators.minLength(6)]],
      confirmPassword:['',Validators.required]
    },{
      validator: MustMatch('password', 'confirmPassword')
    }
    
    
    );
  }
  get f() { return this.commandCenterForm.controls; }


  create(){

    this.submitted = true; 

    if (this.commandCenterForm.invalid) {
      return;
    }
    else if (this.commandCenterForm.valid){
      let req ={
        "profileId": this.profileId,
        "password":this.doctorModel.password,
        "ccName": this.doctorModel.name,
        // "mobNo": this.doctorModel.mobNo,
        "username": this.doctorModel.email
      }
      console.log(req)
      this.ccService.createNewService(req).subscribe(
        data => this.handerSucess(data),
        error => this.handlerError(error)
      )
    }
    }
    
    
   
  handerSucess(data){
    console.log(data)
    this.router.navigate(['/Controlcenter']);
  }
  handlerError(error){
    console.log(error)
    this.error = error.error['error'];
    console.log(this.error)
    this.toaster.error(this.error)
  }
// password() {
//     this.show = !this.show;
// }
}
