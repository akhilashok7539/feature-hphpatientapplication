import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-symptoms',
  templateUrl: './edit-symptoms.component.html',
  styleUrls: ['./edit-symptoms.component.css']
})
export class EditSymptomsComponent implements OnInit {
  isDisabled = false;
  docStatus: string;
  symptoms: any;
  constructor(private doctorservice:DoctorService,private router:Router) { }

  ngOnInit() {

    this.docStatus = sessionStorage.getItem('editDocStatus');
    console.log(this.docStatus)
    this.getallsymptoms()
  }
  edit(){
    // this.isDisabled = true;
    this.router.navigate(['/symptomsupdate']);
  }
  // save(){
  //   this.isDisabled = false; 
  // }
  getallsymptoms()
  {
    let userId = sessionStorage.getItem("editUserId");
    console.log(userId)
    this.doctorservice.getAllSymptomsBydcId(userId).subscribe(
      data =>{
        this.symptoms = data;
      },
      error =>{

      }
    )
  }
}
