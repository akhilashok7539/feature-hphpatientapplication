import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/home/patient.service';
import { Patient } from 'src/app/_model/patient';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-canceled',
  templateUrl: './canceled.component.html',
  styleUrls: ['./canceled.component.css']
})
export class CanceledComponent implements OnInit {
  status = 'CONFIRMED';
  status2 = 'CANCELLED';
  // ccid = 70003;
  searchString: string;
  page: number = 0;
  pages: Array<any>;
  results;
  pendingresults;
  canceledResults;
  ccid: any;
  aa: boolean = false;
  search:any;
  constructor(private router: Router, private patientservice: PatientService) { }

  ngOnInit() {
    this.SearchSelected(this.searchString);
    const users = JSON.parse(localStorage.getItem('currentCc'));
    this.ccid = users['ccId'];
    this.patientservice.getPatientByCancelled(this.status2, this.ccid, this.page).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;

    this.ngOnInit();

    // this.appointConfirm();


  }
  SearchSelected(searchString) {
    console.log(searchString)
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
    console.log(error)
    this.pages = null;
  }
  appointConfirm() {
    this.router.navigate(['/reports']);
  }

  searchs(){
    this.patientservice.searchcancelappointment(this.search).subscribe(
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

