import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../home/patient.service';
import { Patient } from '../_model/patient';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  status = 'COMPLETED';
  status2 = 'CANCELLED';
  public ccid;
  page: number = 0;
  pages: Array<any>;
  results: any;
  pendingresults: Observable<Patient[]>;
  canceledResults: Observable<Patient[]>;
  appointments: any;
  result: any;
  confirmed: any;
  search:any;
  searchString: string;

  constructor(private router: Router, private patientService: PatientService) { }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('currentCc'));
    this.ccid = users['ccId'];
    this.appointConfirm();
  }
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;

    this.appointConfirm();


  }
  appointConfirm() {
    console.log(this.page)
    this.patientService.getPatientByconfirmed(this.status, this.ccid, this.page).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error))
  }
  handlerSucess(data) {
    this.results = data['content'];
    console.log(this.results)
    const itemIds = [];
    for (var i = 0; i < data.totalPages; i++) {
      itemIds.push(data[i]);
    }

    console.log(itemIds)
    this.pages = itemIds
    // this.pages = new Array(data,['totalPages']);


    console.log(this.pages)
  }
  handlerError(error) {
    // this.confirmed = null;
    this.pages = null;
    // this.appointments = null;
    console.log(error)
  }
  canceled(): void {
    this.router.navigate(['/cancelcomponent']);
  }


  // onButtonGroupClick($event){
  //   let clickedElement = $event.target || $event.srcElement;

  //   if( clickedElement.nodeName === "BUTTON" ) {

  //     let isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector(".active");
  //     // if a Button already has Class: .active
  //     if( isCertainButtonAlreadyActive ) {
  //       isCertainButtonAlreadyActive.classList.remove("active");
  //     }

  //     clickedElement.className += " active";
  //   }

  // }
  searchs(){
    this.patientService.searchcancelappointment(this.search).subscribe(
      data =>{
        let array = [];
        var results = data; 
        array.push(results)
        this.results =array;
        console.log(array)
      },
      error =>{
        this.results = undefined;
        this.pages = null;

      }
    )
  }
}
