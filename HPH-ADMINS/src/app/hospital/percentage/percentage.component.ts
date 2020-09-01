import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-percentage',
  templateUrl: './percentage.component.html',
  styleUrls: ['./percentage.component.css']
})
export class PercentageComponent implements OnInit {
  adminpercentage: any = 0;
  Hospitalpercentage: any = 0;
  patienpercentage: any = 0;
  total: any;
  messages: string;
  hospitalId: string;
  percentages: any = [];
  managePercentage = 'data found';
  constructor(private hospitalsevice: HospitalService, private router: Router,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.hospitalId = sessionStorage.getItem('hospitalId');
    console.log(this.hospitalId)
    this.getPercentageDetails();
  }
  getPercentageDetails() {
    this.hospitalsevice.getpercentageByHospitalId(this.hospitalId).subscribe(
      data => {

        this.percentages = data;
        console.log(this.percentages);

        if (this.percentages == null) {
          console.log('hi')
          this.managePercentage = 'No percentage data found';

          // this.router.navigate(['/edit-percentage',this.hospitalId])
        }
        else if (this.percentages != null) {
          console.log('hi2')
          this.managePercentage = 'data found';
          this.adminpercentage = this.percentages.adminPercentage;
          this.patienpercentage = this.percentages.patientPercentage;
          this.Hospitalpercentage = this.percentages.hospitalPercentage;
        }

      }, error => {

      }
    )
    // http://localhost:8080/hph/api/percentage/hospital/60002
  }
  submit() {
    this.total = this.adminpercentage + this.Hospitalpercentage + this.patienpercentage;
    console.log(this.total)
    if (this.total == 100) {
      this.messages = 'Great !!! '

      let req = {
        "hospitalId": this.hospitalId,
        "adminPercentage": this.adminpercentage,
        "patientPercentage": this.patienpercentage,
        "hospitalPercentage": this.Hospitalpercentage
      }
      console.log(req)
      this.hospitalsevice.addPercentage(req).subscribe(
        data => {
          this.toaster.success('Percentage added sucessfully');
          this.router.navigate(['/Hospital']);
        },
        error => {

          this.toaster.error('Please try again after some time!..Server is busy at this moment');

        }
      )
    }
    else {
      this.messages = 'Please try add equal percentage  or acheive 100%' + 'Total  =  ' + this.total;
    }
  }
}
