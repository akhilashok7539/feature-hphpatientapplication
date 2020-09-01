import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from './hospital.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  salesId: any;
  salesDetails: any;
  results: any;
  pages:any =[];
  page:number=0;
  mappeddata: any;
  approvedData: any;
  rejectData: any;
  allhospitalss: any;
  doctorsList: any = [];
  constructor(private router:Router,private hospitalservice:HospitalService,private toaster:ToastrService) { }

  ngOnInit() {
    this.salesDetails = JSON.parse(localStorage.getItem('sales'));
    this.salesId = this.salesDetails.salesId;
    console.log(this.salesId)
    this.getallMappedTosales();
  }
  addHsopital()
  {
    this.router.navigate(['/add-hospital']);

  }
  view(hospital)
  {
    this.router.navigate(['/view-hospital',hospital]);
  }
  viewHospitlas(mappeddata)
  {
    this.router.navigate(['/verify-hospital',mappeddata]);

  }
//GET ALL REQUEST TO BE APPROVED SECTION
  getallMappedTosales(){
    // this.page = 0;

    this.hospitalservice.getAllhospitalMappedtosales(this.page,this.salesId).subscribe(
      data =>{
        this.mappeddata = data['content'];
        this.pages =  new Array(data['totalPages']);
      },
      error =>{
        this.pages = null;
        this.mappeddata = null;
      }
    )
  }
  setPage(i,event:any){
    console.log('pagination active')
    event.preventDefault();
    this.page = i;
   
    this.getallMappedTosales();


  }

//GET ALL ACTIVE HOSPITAL REQUEST SECTION
  getallmappedHospitals()
  {
    // this.page = 0;

    this.hospitalservice.getAllMappedHospitalsllist(this.salesId,this.page).subscribe(
      data =>{
        this.allhospitalss = data['content'];
        console.log(this.allhospitalss)
        this.pages =  new Array(data['totalPages']);
      },
      error =>{
        this.pages = null;

      }
    )
  }
  getActive(i,event:any){
    console.log('pagination active')
    event.preventDefault();
    this.page = i;
   
    this.getallmappedHospitals();


  }
//APPROVE REQUEST SECTION
  approve(data)
  {
    let req = {

    }
    console.log(data.hospitalId)
    this.hospitalservice.approveMappedDate(data.hospitalId,req).subscribe(
      data =>{
        this.toaster.success('Sales approved');
        this.getallMappedTosales();
      },
      error =>{

        this.toaster.error('Sales unable to approve the request,please check after some time');
      }
    )
  }
  // REJECT REQUEST SECTION
  Reject(data)
  {
    let req = {
    }
    console.log(data.hospitalId)
    this.hospitalservice.rejectmappedData(data.hospitalId,req).subscribe(
      data =>{
        this.toaster.success('Sales rejected');
        this.getallMappedTosales();
      },
      error =>{
        this.toaster.error('Sales unable to reject the request,please check after some time');

      }
    )
  }
  //GET ALL SAELS APROVED CONNECTION SECTION
  getallmappedHospitalsSalesApproved(){
    // this.page = 0;

    this.hospitalservice.getallapprovedStatus(this.page,this.salesId).subscribe(
      data =>{
        this.approvedData = data['content'];
        this.pages =  new Array(data['totalPages']);

      },
      error =>{
        this.pages = null;

      }
    )
  }
  setsalesApprovedPage(i,event:any){
    console.log('pagination active')
    event.preventDefault();
    this.page = i;
   
    this.getallmappedHospitalsSalesApproved();


  }
  // GET ALL SALES REJECT CONNECTION SECTION
  getallmappedHospitalsSalesReject()
  {
    // this.page = 0;

    this.hospitalservice.getallRejectStatus(this.page,this.salesId).subscribe(
      data =>{
        this.rejectData = data['content'];
        this.pages =  new Array(data['totalPages']);

      },
      error =>{
        this.pages = null;

      }
    )
  }
  setsalesRejectPage(i,event:any){
    console.log('pagination active')
    event.preventDefault();
    this.page = i;
   
    this.getallmappedHospitalsSalesReject();


  }
  doctors(){
    this.router.navigate(['/Doctors']);
  }
  getallDoctors(){
    // this.page = 0;
    this.hospitalservice.getAlldoctorsAddedbysales(this.salesId,this.page).subscribe(
      data =>{
        this.doctorsList = data['content'];
        this.pages =  new Array(data['totalPages']);
       
      },
      error =>{
        console.log(error);
        this.pages =null;
      }
    )
  }
  getdoctorpages(i,event:any){
    console.log('pagination active')
    event.preventDefault();
    this.page = i;
    this.getallDoctors();
  }
  pending(){
    this.router.navigate(['/pendingDoclist']);
  }
  viewdoc(doctorsList){
    console.log(doctorsList.doctorId);
    
    this.router.navigate(['/doctorview',doctorsList.doctorId]);
  }
}
