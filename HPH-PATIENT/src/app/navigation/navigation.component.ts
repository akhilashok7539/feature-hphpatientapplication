import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isloggedIn = false;
  firstName: any;
  lastName: any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.isloggedIn = JSON.parse(sessionStorage.getItem('isLoggedin'))
    if(this.isloggedIn == null)
    {
      this.isloggedIn = false
    }
    if(this.isloggedIn ==true)
    {
      const users = JSON.parse(localStorage.getItem('currentPatient'));
      this.firstName = users['firstName'];
      this.lastName = users['lastName'];
      console.log(users)
    }
   
  }
  logout()
  {
    localStorage.clear();
    sessionStorage.setItem('isLoggedin','false');
    // window.location.reload();
    this.ngOnInit();
    this.router.navigate(['/Home']);
  }
}
