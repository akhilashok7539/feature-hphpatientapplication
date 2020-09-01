import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  uname: any;

  constructor(private router:Router) { }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('currentdoctor'));

    this.uname = users['0'].firstName;
    console.log(this.uname)
  }
  logout(){
    localStorage.removeItem('currentstatus');
    localStorage.removeItem('currentuserId');
    localStorage.removeItem('currentdoctor');
    this.router.navigate(['/Login'])
  }
}
