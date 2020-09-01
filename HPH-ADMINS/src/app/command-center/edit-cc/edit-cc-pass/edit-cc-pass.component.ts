import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommandCenter } from 'src/app/_models/commandcenter';
import { Router, ActivatedRoute } from '@angular/router';
import { CommandcenterService } from '../../commandcenter.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-edit-cc-pass',
  templateUrl: './edit-cc-pass.component.html',
  styleUrls: ['./edit-cc-pass.component.css']
})
export class EditCcPassComponent implements OnInit {

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
    
    console.log(userId)
    
    this.editCCForm = this.formBuilder.group({

      
      password:['',[Validators.required, Validators.minLength(6)]],
      confirmPassword:['',Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }
     
    );
  }
  get f() { return this.editCCForm.controls; }
  updatePasword(){
    this.submitted = true; 

    if (this.editCCForm.invalid) {
      return;
    }
    else if (this.editCCForm.valid){
    let userId = sessionStorage.getItem("cmdId");
    let req ={
      "userId":userId,
      "profileId":this.profileId,
      "password": this.doctorModel.password,
      
    }
    
    console.log(req)
    this.ccService.updatePassoword(req).subscribe(
      data => this.sucessdata(data),
      error => this.dataError(error)
    )
    }
  }
  sucessdata(data){
    console.log(data)

    this.router.navigate(['/CC']);
    sessionStorage.clear();
    console.log(sessionStorage)

  }
  dataError(error){
  console.log(error)
  }

}
