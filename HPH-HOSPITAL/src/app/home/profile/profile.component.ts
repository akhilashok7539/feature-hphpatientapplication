import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor/doctor.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  hospitlaDetails: any;
  AddressDetailes: any;
  name: any;
  mob: any;
  contactEmail: any;
  contactName: any;
  hospitalType: any;
  city: any;
  email: any;
  contactPhone: any;
  profileId = 6;
  street: any;
  location: any;
  state: any;
  userId:any;
  Country: any;
  hospitalStautsUser:any;
  constructor(private doctorservice: DoctorService) { }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalStautsUser = localStorage.getItem('currenthospitalUserStatus');
    // this.ccId = users['ccId'];
    // console.log(this.ccId)
    //console.log(users)
    this.handlerSucess(users);
    this.addressDetails();
  }
  handlerSucess(users) {
    if(this.hospitalStautsUser == 'HOSPITAL_USER')
    {
      this.hospitlaDetails = users;
      console.log(this.hospitlaDetails)
  
      this.name = this.hospitlaDetails.hospital['hospitalName'];
      this.mob = this.hospitlaDetails.hospital['phone'];
  
      this.email = this.hospitlaDetails.hospital['email'];
      this.contactPhone = this.hospitlaDetails.hospital['contactPhone'];
      this.contactEmail = this.hospitlaDetails.hospital['contactEmail'];
      this.contactName = this.hospitlaDetails.hospital['contactName'];
      this.hospitalType = this.hospitlaDetails.hospital['hospitalType'];
      this.city = this.hospitlaDetails.hospital.city['cityName'];
    }
    else {
      this.hospitlaDetails = users;
      console.log(this.hospitlaDetails)
  
      this.name = this.hospitlaDetails['hospitalName'];
      this.mob = this.hospitlaDetails['phone'];
  
      this.email = this.hospitlaDetails['email'];
      this.contactPhone = this.hospitlaDetails['contactPhone'];
      this.contactEmail = this.hospitlaDetails['contactEmail'];
      this.contactName = this.hospitlaDetails['contactName'];
      this.hospitalType = this.hospitlaDetails['hospitalType'];
      this.city = this.hospitlaDetails.city['cityName'];
    }

    
  }
  addressDetails() {

    if(this.hospitalStautsUser == 'HOSPITAL_USER')
    {
      let users = JSON.parse(localStorage.getItem('CurrentHospital'));
      this.userId = users.hospital['hospitalId'];
    }
    else {
      let users = JSON.parse(localStorage.getItem('CurrentHospital'));
      this.userId = users['hospitalId'];
    }
    let req = {
      "profileId": this.profileId,
      "userId": this.userId

    }
    console.log(req)
    this.doctorservice.ViewProfileAddress(this.profileId, this.userId, req).subscribe(
      data => this.handlerAddressSucess(data)
    );

  }
  handlerAddressSucess(data) {
    console.log(data)
    this.AddressDetailes = data;
    this.street = this.AddressDetailes['street'];
    this.location = this.AddressDetailes['location'];
    // this.city = this.AddressDetailes['city']
    this.state = this.AddressDetailes['state'];
    this.Country = this.AddressDetailes['country'];
  }

}
