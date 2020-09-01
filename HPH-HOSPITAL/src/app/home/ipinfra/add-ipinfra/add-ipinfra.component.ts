import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Infra } from 'src/app/_model/infra';
import { HospitalService } from 'src/app/hospital/hospital.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-ipinfra',
  templateUrl: './add-ipinfra.component.html',
  styleUrls: ['./add-ipinfra.component.css']
})
export class AddIpinfraComponent implements OnInit {
  inForm: FormGroup;
  infraModel: Infra;
  submitted = false;
  hospitalId: any;
  error: any;
  roomNames: any;
  cost: any;
  feature: any;
  userId: string;
  infraID: any;
  currentFoto: any;
  files: any;
  formData = new FormData();
  constructor(private fb: FormBuilder,private toaster:ToastrService,
    private hospitalservice:HospitalService,private router:Router) { }

  ngOnInit() {
    // this.infraModel = new Infra();

    this.inForm = this.fb.group({
      roomNames: ['', Validators.required],
      cost: ['', Validators.required],
      feature: ['', Validators.required],
      photo:['',Validators.required]
    })
  }
  get f() { return this.inForm.controls; }

  create() {
    this.submitted = true;
    if (this.inForm.invalid) {
      console.log(this.inForm)
    }
    else if (this.inForm.valid) {
      this.userId = localStorage.getItem("currentuserId");
      let req = {
        "hospitalId": this.userId,
        "roomName": this.roomNames,
        "cost": this.cost,
        "description":this.feature
      }
      this.hospitalservice.addIp(req).subscribe(
        data =>{
          this.infraID = data['infraId'];
          this.addPIC();
        
        },
        error =>{
          this.toaster.error('Server is busy at this moment ! please try after some time');
        }
      )
    }
  }

  addPhoto(event) {

    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
    
    //  console.log(this.currentFoto)
  }
  addPIC(){
    console.log(this.infraID)
    this.formData.append('pic',this.currentFoto );
    this.hospitalservice.uploadPhoto(this.formData,this.infraID).subscribe(
      data =>{
        this.router.navigate(['/ipinfra']);
        this.toaster.success('IP Infra added sucessfully');
      },
      error => {
        this.toaster.error('Server is busy at this moment ! please try after some time');
        
      },
    )
  }
}
