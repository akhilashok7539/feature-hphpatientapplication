import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/hospital/hospital.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-doctortodepartment',
  templateUrl: './add-doctortodepartment.component.html',
  styleUrls: ['./add-doctortodepartment.component.css']
})
export class AddDoctortodepartmentComponent implements OnInit {
  hospitalId: any;
  results: any;
  doctorform:FormGroup;
  doctors=[];
  value: any;
  departmentId: any;
  constructor(private hospitalservice:HospitalService,private router:Router,private toaster:ToastrService,
    private formbuilder:FormBuilder,private activaterouter:ActivatedRoute) 
  {
    this.activaterouter.params.subscribe(
      params => {
        console.log(params)
        this.departmentId = params.departmentId;
      }
    );
  }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalId = users['hospitalId'];
    this.getallActiveDoctors();
    this.doctorform = this.formbuilder.group({
      checkedvalue:['',Validators.required],
      timseslotssessions: this.formbuilder.array([]),


    });
  }
  onChange(time: string, isChecked: boolean) {
    this.doctors =[];
    const emailFormArray = <FormArray>this.doctorform.controls.timseslotssessions;
    if (isChecked) 
    {
      emailFormArray.push(new FormControl(time));
      this.value = emailFormArray['value']
      //console.log(this.value)

      for(let j=0;j<this.value.length;j++){
          this.doctors.push( this.value[j]);

      }
      console.log(this.doctors)

      
      
  
    } 

    else 
    {
      let index = emailFormArray.controls.findIndex(x => x.value == time)
      emailFormArray.removeAt(index);
    }

  }
 getallActiveDoctors() {
    this.hospitalservice.getAllActiveDoctors(this.hospitalId).subscribe(
      data => {
        this.results = data;
        console.log(this.results)
      },
      error => {
      
      }
    )
  }
  create()
  {
    let req =[];
    for(let j=0;j<this.doctors.length;j++){ 
    req.push(
      {
        "departmentId":this.departmentId,
        "doctorId":this.doctors[j]
      }
    )
    }
    console.log(req)
    this. hospitalservice.addDoctorstoDepartmetn(req).subscribe(
      data =>{
        this.toaster.success('Doctor added to department sucessfully');
        this.router.navigate(['/department'])
      },
      error =>{
        this.toaster.error('Server is busy at this moment');
      }
    )
  }
}
