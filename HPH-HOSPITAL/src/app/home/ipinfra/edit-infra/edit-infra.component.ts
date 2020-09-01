import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Infra } from 'src/app/_model/infra';
import { HospitalService } from 'src/app/hospital/hospital.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-infra',
  templateUrl: './edit-infra.component.html',
  styleUrls: ['./edit-infra.component.css']
})
export class EditInfraComponent implements OnInit {
  inForm: FormGroup;
  infraModel: Infra;
  submitted = false;
  hospitalId: any;
  error: any;
  roomNames: any;
  cost: any;
  feature: any;
  userId: string;
  infraId: any;
  imageEdit: any = 'no';
  currentFoto: any;
  files: any;
  formData = new FormData();
  constructor(private router: Router, private hospitalservice: HospitalService, private toaster: ToastrService,
    private activaterouter: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.activaterouter.params.subscribe(
      params => {
        console.log(params)
        this.roomNames = params.infraName;
        this.cost = params.infraCost;
        this.feature = params.infraDescription;
        this.infraId = params.infraId;
      }
    )
   
      this.inForm = this.fb.group({
        roomNames: ['', Validators.required],
        cost: ['', Validators.required],
        feature: ['', Validators.required],
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
        "infraId": this.infraId,
        "roomName": this.roomNames,
        "cost": this.cost,
        "description": this.feature
      }
      this.hospitalservice.updateIP(req).subscribe(
        data => {
        
          if(this.imageEdit == 'no')
          {
            this.router.navigate(['/ipinfra']);
            this.toaster.success('IP Infra update successfully');
          }
          else if(this.imageEdit =='yes')
          {
            if(this.currentFoto == null)
            {
              this.toaster.error('Please upload a picture');
              return;
            }
            this.addPIC();
            // this.router.navigate(['/ipinfra']);
            // this.toaster.success('IP Infra update successfully');
          }

        },
        error => {
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
    console.log(this.infraId)
    this.formData.append('pic',this.currentFoto );
    this.hospitalservice.uploadPhoto(this.formData,this.infraId).subscribe(
      data =>{
        this.router.navigate(['/ipinfra']);
        this.toaster.success('IP Infra updated sucessfully');
      },
      error => {
        this.toaster.error('Server is busy at this moment ! please try after some time');
        
      },
    )
  }
}
