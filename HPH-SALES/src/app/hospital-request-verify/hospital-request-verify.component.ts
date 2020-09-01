import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospital-request-verify',
  templateUrl: './hospital-request-verify.component.html',
  styleUrls: ['./hospital-request-verify.component.css']
})
export class HospitalRequestVerifyComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  view()
  {
    this.router.navigate(['/verify-hospital']);
  }
}
