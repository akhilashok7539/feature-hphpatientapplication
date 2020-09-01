import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css']
})
export class SymptomsComponent implements OnInit {

  isDisabled = false;
  docStatus: string;
  symptoms: Object;
  constructor(private doctorservice:DoctorService,private router:Router) { }

  ngOnInit() {

    this.docStatus = sessionStorage.getItem('editDocStatus');
    console.log(this.docStatus)
    this.getallsymptoms()
  }
  edit(){
    // this.isDisabled = true;
    this.router.navigate(['/updateSymptoms']);
  }
  // save(){
  //   this.isDisabled = false; 
  // }
  getallsymptoms()
  {
    let userId = JSON.parse(localStorage.getItem('currentuserId'));
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
