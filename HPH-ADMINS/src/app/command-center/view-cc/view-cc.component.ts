import { Component, OnInit } from '@angular/core';
import { CommandcenterService } from '../commandcenter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cc',
  templateUrl: './view-cc.component.html',
  styleUrls: ['./view-cc.component.css']
})
export class ViewCcComponent implements OnInit {
  CCdetails: any;
  ccname: any;
  ccmobno: any;
  ccemail: any;

  constructor(private router:Router,private commandservice:CommandcenterService) { }

  ngOnInit() {
    let userId = sessionStorage.getItem("cmdId");
    console.log(userId)
    this.commandservice.getCommandById(userId).subscribe(
      data =>{
        this.handleSuccess(data)
      }
    )

  }
  handleSuccess(data){
    
    this.CCdetails = data
    console.log(this.CCdetails)
    this.ccname = this.CCdetails['name'];
    this.ccmobno= this.CCdetails['mobNo'];
    this.ccemail = this.CCdetails['email'];
    sessionStorage.clear();
    console.log(sessionStorage)


  }
}
