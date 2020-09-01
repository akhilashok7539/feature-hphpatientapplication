import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.css']
})
export class DoctorViewComponent implements OnInit {
  panelOpenState = false;
  DoctorId: any;
  docStatus: any;
  constructor() { }

  ngOnInit() {
    this.DoctorId = JSON.parse(sessionStorage.getItem('editUserId'));
    console.log(this.DoctorId)
    this.docStatus = sessionStorage.getItem('editDocStatus');
    console.log(this.docStatus)
  }

}
