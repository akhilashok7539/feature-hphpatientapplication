import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-leave',
  templateUrl: './doctor-leave.component.html',
  styleUrls: ['./doctor-leave.component.css']
})
export class DoctorLeaveComponent implements OnInit {
  docLeaves: any;

  constructor(private router:Router,private doctorservice:DoctorService) { }

  ngOnInit() {
    this.getallleavebyDocId();
    
    
  }
  addleave()
  { 
    this.router.navigate(['/add-leave'])
  }
  getallleavebyDocId()
  {
    let userId = JSON.parse(localStorage.getItem('currentuserId'));

    this.doctorservice.getallLeaveBydocId(userId).subscribe(
      data=>{
        this.docLeaves = data;
        console.log(this.docLeaves)
      },
      error =>{

      }
    )
  }
}
