import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-timeslots',
  templateUrl: './timeslots.component.html',
  styleUrls: ['./timeslots.component.css']
})
export class TimeslotsComponent implements OnInit {
  timeslots: any;

  constructor(private router:Router,private doctorservice:DoctorService) { }

  ngOnInit() {
    let userId = JSON.parse(localStorage.getItem('currentuserId'));
    console.log(+userId)
    this.doctorservice.getAllsessions(userId).subscribe(
      data =>{
        this.timeslots = data;
      }
    )
  }
  edit(){
    this.router.navigate(['/updatetimeslots'])
  }

}
