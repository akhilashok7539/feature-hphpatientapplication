import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/mustmatch';
import { CommandCenter } from 'src/app/_model/commandcenter';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommandcenterService } from '../commandcenter.service';
@Component({
  selector: 'app-add-commandcenter',
  templateUrl: './add-commandcenter.component.html',
  styleUrls: ['./add-commandcenter.component.css']
})
export class AddCommandcenterComponent implements OnInit {


  show: boolean;
  submitted = false;
  loading: boolean;
  commandCenterForm :FormGroup;
  profileId=7;
  public doctorModel:CommandCenter;
  error: any;
  userId: string;
  constructor(private router:Router,private formBuilder: FormBuilder, 
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private ccService:CommandcenterService) { 
    this.show = false;
    this.doctorModel = new CommandCenter();
  }

  ngOnInit() {
    this.commandCenterForm = this.formBuilder.group({

      name:['',Validators.required],
      mobNo:['',[Validators.required,Validators.pattern('[6-9]\\d{9}')]],
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['',[Validators.required, Validators.minLength(8)]],
      confirmPassword:['',Validators.required]
    },{
      validator: MustMatch('password', 'confirmPassword')
    }
    
    
    );
    this.userId = localStorage.getItem("currentuserId");

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
        "mobNo": this.doctorModel.mobNo,
        "username": this.doctorModel.email,
        "hospitalId":this.userId
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
    this.toaster.success('CC added successfully');
    this.router.navigate(['/commandcenter'])
  }
  handlerError(error){
    console.log(error)
    this.error = error.error['error'];
    console.log(this.error)
    this.toaster.error(this.error);
  }
}