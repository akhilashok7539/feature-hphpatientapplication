import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { DoctorService } from '../../../doctor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-symptoms-update',
  templateUrl: './symptoms-update.component.html',
  styleUrls: ['./symptoms-update.component.css']
})
export class SymptomsUpdateComponent implements OnInit {
  results:any;
  symptoms :FormGroup;
  doctorsymptoms =[];
  idChecked = [];
  value: any;
  doctorId: string;
  completeprofile = 'Update Symptoms';
  isLoading = false;
  constructor(private doctorservice:DoctorService,private formBuilder: FormBuilder,
    private router:Router,
    private toaster:ToastrService) { }

  ngOnInit() {
    this.doctorId=sessionStorage.getItem("editUserId");
    console.log(this.doctorId)
    this.getallSymptoms();
    this.getallsymptoms();
    this.symptoms = this.formBuilder.group({
      useremail: this.formBuilder.array([]),
      check:['',Validators.required]
    });
  }
  getallSymptoms()
  {
    this.doctorservice.getAllSymptoms().subscribe(
      data =>{
        this.results = data;
        console.log(this.results)
      },
      error =>{

      }
    )
  }
  onChange(time: string, isChecked: boolean) {
    this.doctorsymptoms =[];
    const emailFormArray = <FormArray>this.symptoms.controls.useremail;
    if (isChecked) 
    {
      emailFormArray.push(new FormControl(time));
      this.value = emailFormArray['value']
      console.log(this.value)

      for(let j=0;j<this.value.length;j++){
          this.doctorsymptoms.push( this.value[j]);

      }
      console.log(this.doctorsymptoms)

      
      
  
    } 

    else 
    {
      let index = emailFormArray.controls.findIndex(x => x.value == time)
      emailFormArray.removeAt(index);
    }


    // console.log(emailFormArray)
   }
   next(){
    this.isLoading = true;
    this.completeprofile = 'Processing';
     console.log('hi')
    let req = [];
    
    for(let j=0;j<this.doctorsymptoms.length;j++){
      req.push( 
        {
       "doctorId":this.doctorId,
       "sicknessId":this.doctorsymptoms[j]
        }
       )
     } 
     console.log(req)
     this.doctorservice.addSymptoms(req).subscribe(
       data =>{
        // this.changeStatus();
        this.router.navigate(['/doctor-view']);
       },
       error =>{

       }
     )
   }

   getallsymptoms()
   {
     let userId = sessionStorage.getItem("editUserId");
     console.log(userId)
     this.doctorservice.getAllSymptomsBydcId(userId).subscribe(
       data =>{
       
        let checkedReuslts ;
        checkedReuslts = data;
        console.log(checkedReuslts.length)
        
        for(let  i =0;i<checkedReuslts.length;i++)
        {
          this.idChecked.push(
            {
             
              "id":checkedReuslts[i].sicknessId,
            }
          )
        }
        console.log(this.idChecked)
        // for(let k =0;k<this.idChecked.length;k++)
        // {
        //   this.results.push(this.idChecked[k])
        // }
     
       },
       error =>{
 
       }
     )
   }
   
  // get result() {
  //   return this.idChecked.filter(item => item.checked);
  // }

}
