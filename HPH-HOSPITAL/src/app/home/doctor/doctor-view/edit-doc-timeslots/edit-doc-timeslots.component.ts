import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-edit-doc-timeslots',
  templateUrl: './edit-doc-timeslots.component.html',
  styleUrls: ['./edit-doc-timeslots.component.css']
})
export class EditDocTimeslotsComponent implements OnInit {
  timeslots: any;

  constructor(private router:Router,private doctorservice:DoctorService) { }

  ngOnInit() {
    let userId = sessionStorage.getItem("editUserId");
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
