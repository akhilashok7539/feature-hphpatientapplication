import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  patiendId: any;

  constructor() { }

  ngOnInit() {
    this.patiendId = JSON.parse(localStorage.getItem('currentPatientid'));
  }

}
