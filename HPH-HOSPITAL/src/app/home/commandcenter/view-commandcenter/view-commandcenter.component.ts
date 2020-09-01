import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-commandcenter',
  templateUrl: './view-commandcenter.component.html',
  styleUrls: ['./view-commandcenter.component.css']
})
export class ViewCommandcenterComponent implements OnInit {
  ccId: any;

  constructor() { }

  ngOnInit() {
    this.ccId = JSON.parse( sessionStorage.getItem('cmdId'));
    console.log(this.ccId)
  }

}
