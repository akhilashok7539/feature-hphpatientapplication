import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'src/app/hospital/hospital.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-getall-sales-persons',
  templateUrl: './getall-sales-persons.component.html',
  styleUrls: ['./getall-sales-persons.component.css']
})
export class GetallSalesPersonsComponent implements OnInit {
  results: any;
  salesId:any;
  hospitalId: any;
  pageIndex = 0
  constructor(private activateRouter:ActivatedRoute,private toaster:ToastrService,
    private router:Router,
    private hospitalservice:HospitalService)
   {
    this.activateRouter.params.subscribe(params => {
      console.log(params.hospitalId)
      this.hospitalId = params.hospitalId
    })
    }

  ngOnInit() {
    this.salesId = '';
    this.getallSales();
  }
  getallSales()
  {
    
    this.hospitalservice.getallHospitalService(this.pageIndex).subscribe(
      data =>{
        this.results = data['content'];
        console.log(this.results)
      },
      error =>{

      }
    )
  }
  approveRequest()
  {
    
    this.salesId = this.salesId;
    console.log(this.salesId)
    let req = {

    }
    this.hospitalservice.mappedToSales(this.hospitalId, this.salesId,req).subscribe(
      data =>{
        this.toaster.success('Hospital mapped to sales completed')
    this.router.navigate(['/approvalRequest']);

      },
      error =>{

      } 
    )
  }
  back()
  {
    this.router.navigate(['/approvalRequest']);
  }
}
