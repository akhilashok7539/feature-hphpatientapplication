import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  uname:any;
  hospitalStautsUser:any;
  constructor(private router:Router,private loginservice:LoginService) { }

  ngOnInit() {
   
    this.hospitalStautsUser = localStorage.getItem('currenthospitalUserStatus');
    if(this.hospitalStautsUser == 'HOSPITAL_USER')
    {
      this.hospitalStautsUser = 'HOSPITAL_USER';
      const users = JSON.parse(localStorage.getItem('CurrentHospital'));
      this.uname = users['name'];
      console.log(this.uname)
    }
    else{
      this.hospitalStautsUser = 'HOSPITAL';
      const users = JSON.parse(localStorage.getItem('CurrentHospital'));
      this.uname = users['hospitalName'];
      console.log(this.uname)
    }

  }
  logout(){
    
    this.loginservice.onlogout();
    // localStorage.clear();
    // console.log(localStorage)
    // this.router.navigate(['/Login']);
  }

}
