import { Component, OnInit, AbstractType } from '@angular/core';
import { PatientService } from '../../patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-choose-ip-infra',
  templateUrl: './choose-ip-infra.component.html',
  styleUrls: ['./choose-ip-infra.component.css']
})
export class ChooseIpInfraComponent implements OnInit {
  hsopitalId: any;
  BookingId: any;
  results: any;
  infraId:any = '';
  constructor(private patientservice:PatientService,private toaster:ToastrService,
    private router:Router,private activaterouter:ActivatedRoute) { }

  ngOnInit() {
    this.activaterouter.params.subscribe(params =>{
      this.hsopitalId = params.hospitalId,
      this.BookingId = params.id
    })
    this.getallIpInfra();
  }
  getallIpInfra()
  {
    this.patientservice.getAllIpInfra(this.hsopitalId).subscribe(
      data =>{
        console.log(data)
        this.results = data;
      },
      error =>{
        console.log(error)
      }
    )
  }
  submit(){
    if(this.infraId != '' && this.infraId != null)
    {
      let req = {
        "bookingId":this.BookingId,
        "ipInfra":this.infraId,
      }
      console.log(req)
      this.patientservice.addIPinfraRoom(req).subscribe(
        data =>{
          this.toaster.success('IP Infra added successfully ');
          this.router.navigate(['/onprogress']);
        },
        error =>{

        }
      )
    }
    else {
      this.toaster.error('Please choose a IP Infra')
    }
    
  }
}
