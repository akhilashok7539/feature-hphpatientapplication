import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-percentage',
  templateUrl: './edit-percentage.component.html',
  styleUrls: ['./edit-percentage.component.css']
})
export class EditPercentageComponent implements OnInit {
  adminpercentage: any = 0;
  Hospitalpercentage: any = 0;
  patienpercentage: any = 0;
  total : any;
  messages: string;
  hospitalId: string;
  percentagId;
  percentages: Object;
  constructor(private hospitalsevice:HospitalService,private router:Router,
    private activaterouter:ActivatedRoute,
    private toaster:ToastrService) { }

  ngOnInit() {
    this.hospitalId = sessionStorage.getItem('hospitalId');
    console.log(this.hospitalId)
    this.activaterouter.params.subscribe(
    params =>{
      console.log(params.id)
      this.percentagId = params.id;
    }
    )
    this.getperecntageByhospital();
  }
  submit(){
    this.total = this.adminpercentage+ this.Hospitalpercentage + this.patienpercentage;
    console.log(this.total)
    if(this.total == 100)
    {
      this.messages = 'Great !!! '

      let req = {
        "percentageId":this.percentagId,
        "adminPercentage":this.adminpercentage,
        "patientPercentage":this.patienpercentage,
        "hospitalPercentage":this.Hospitalpercentage
      }
      console.log(req)
      this.hospitalsevice.updatePercentage(req).subscribe(
        data =>{
          this.toaster.success('Percentage added sucessfully');
          this.router.navigate(['/Hospital']);
        },
        error =>{
       
          this.toaster.error('Please try again after some time!..Server is busy at this moment');

        }
      )
    }
    else {
      this.messages = 'Please try add equal percentage  or acheive 100%' +'Total  =  '+ this.total;
    }
  }
  getperecntageByhospital() {
    let userId = sessionStorage.getItem("hospitalId");
    this.hospitalsevice.getpercentageByHospitalId(userId).subscribe(
      data =>{
        this.percentages = data;
        
        this.adminpercentage = this.percentages['adminPercentage'];
        this.Hospitalpercentage = this.percentages['hospitalPercentage'];
        this.patienpercentage = this.percentages ['patientPercentage'];
       
        }
       
       
     
    )
  }
}
