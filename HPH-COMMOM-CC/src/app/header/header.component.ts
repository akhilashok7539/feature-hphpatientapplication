import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  CCname: any;
 

  constructor(private router:Router,private loginservice:LoginService) { }

  ngOnInit() {
    // const userId = localStorage.getItem('currentCc')
    // console.log(userId)
    let Username = JSON.parse(localStorage.getItem('currentCc'));
    this.CCname= Username['name']
    console.log(this.CCname)
  
  }
  viewNotifications(){
  this.router.navigate(['/notifications']);
  }
  logout(){
    this.loginservice.onlogout();
    // localStorage.clear();
    // console.log(localStorage)
    // this.router.navigate(['/Login']);
  }
}
