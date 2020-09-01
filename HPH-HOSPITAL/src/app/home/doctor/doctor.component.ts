import { Component, OnInit, InjectionToken } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/_model/doctor';
import { MatDialog, MatButtonToggleDefaultOptions } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from './doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  aa:boolean=false;
  public status1= "INACTIVE";
  public status2= "ACTIVE";
  doctorId:any;
  // active page number
   page:number=0; 
   pages:Array<any>;
  //penindig page number
   pagePending:number = 0;
  // inactive page number
   pageInactive:number = 0;

  doctors : Observable<Doctor[]>; 
  // HospitalId =60001;
  // clicked = false;
  public searchString: string;
  hospitalId: any;
  show:any;
  doctorslist:any;
  values: any;
  myFlagForButtonToggle:any;
  Messages: any;
  viewMode='tab1';
  MessagesPending: any;
  searchanalayis = 'Active';
  i:number = 1;

  constructor(private router:Router,private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,private toaster:ToastrService,
    private _router: Router,private doctorservice:DoctorService) { }

  ngOnInit() {
    let hospitalId = localStorage.getItem('currentuserId');
    this.doctorservice.getAlldoctoractive(this.page,hospitalId).subscribe(
      data => this.handlerSucesss(data),
      error => this.handlerErrors(error)
    )
    const users = JSON.parse(localStorage.getItem('CurrentHospital'));
    this.hospitalId = users['hospitalId'];


    let currentstatus = localStorage.getItem('currentstatus');
    console.log(currentstatus)
    if(currentstatus == 'ADMIN_UNAPPROVED'){
      this.show =  'ADMIN_UNAPPROVED';
    }
    else if(currentstatus == 'PENDING'){
      this.show = 'PENDING';

    }
    else if(currentstatus == 'ACTIVE'){
      this.show = 'ACTIVE';
    }
    else if(currentstatus == 'MAPPED_TO_SALES'){
      this.show = 'MAPPED_TO_SALES';
    }
  
  }

  handlerSucesss(data){
    this.doctorslist=data['content'];
    this.pages =  new Array(data['totalPages']);
    
    console.log(this.pages)
    console.log(this.doctorslist)
    this.Messages = 'Data found';
  }
  handlerErrors(error){
    // this.ngOnInit();
    this.doctorslist = null;
    this.pages = null;
    this.Messages = error.error.error;
    console.log(error.error.error)
  }
  onKey(event: any) {
    this.page =0;
    this.values = event.target.value ;
    console.log(this.searchanalayis)
    if(this.searchanalayis == 'Active')
    { 
      this.doctorservice.searchActiveDoctors(this.page,this.hospitalId,this.values).subscribe(
        data => this.handlerSucesss(data),
        error => this.handlerErrors(error)
      )
    }
    else if(this.searchanalayis == 'Inactive')
    {
      
      this.doctorservice.searchInactiveDoctors(this.page,this.hospitalId,this.values).subscribe(
        data => this.Sucess2(data),
          error => this.Error2(error)
      )
    }
    else if(this.searchanalayis == 'Pending')
    {
      
      this.doctorservice.searchPendingDoctors(this.page,this.hospitalId,this.values).subscribe(
        data => this.Sucess1(data),
        error => this.Error1(error)
      )
    }
    

  }
  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
 
    this.ngOnInit();


  }
  inactive(){
    let hospitalId = localStorage.getItem('currentuserId');
    this.doctorservice.getInactiveDoctor(this.page,hospitalId).subscribe(
      data => this.Sucess2(data),
      error => this.Error2(error)
    )
  
  }

  // public changeText(): void {
  //   if(this.text === 'hello') { 
  //     this.text = 'rank'
  //   } else {
  //     this.text = 'hello'
  //   }
  // }
  buttonselected(cat){
    let hospitalId = localStorage.getItem('currentuserId');
    this.doctorslist =[];
    if(cat === 'Active'){
      console.log('Active list will display')
      this.doctorservice.getAlldoctoractive(this.page,hospitalId).subscribe(
        data => this.handlerSucesss(data),
        error => this.handlerErrors(error)
      )
    }
    else if(cat === 'Pending'){
      console.log('Pending list will display')
      // this.doctorservice.getallPendingdoctor(this.page,hospitalId).subscribe(
      //   data => this.Sucess1(data),
      //   error => this.Error1(error)
      // )
      this.router.navigate(['/doctor/pending']);
    
      
    }
    else if(cat === 'In-Active'){
      console.log('Listed list will display')
      // this.doctorservice.getInactiveDoctor(this.page,hospitalId).subscribe(
      //   data => this.Sucess2(data),
      //   error => this.Error2(error)
      // )
      this.router.navigate(['/doctor/inactive']);
    }
  }

  
  edit(doc:Doctor){
    sessionStorage.setItem("editUserId", doc.doctorId);
    localStorage.setItem("edituserStatus",doc.status);
    console.log(sessionStorage)
    //this.router.navigate(['edit-user']);
    this.router.navigate(['/update-doctor']);
  }
  status(doc:Doctor){
    console.log(this.status1)
    sessionStorage.setItem("editUserId", doc.doctorId.toString());
    let userId = sessionStorage.getItem("editUserId");
    console.log(sessionStorage)
  
    let req ={

    }
    this.doctorservice.changeStatus(userId,this.status1,req).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
  handlerSucess(data){
  console.log('status changedd')
  sessionStorage.clear();
  let hospitalId = localStorage.getItem('currentuserId');
  this.doctorservice.getAlldoctoractive(this.page,hospitalId).subscribe(
      data => this.handlerSucesss(data),
      error => this.handlerErrors(error)
    )
  console.log(sessionStorage)
  }
  handlerError(error){
  console.log('STATUS NOT CHANGEDD ')
  }
  addDoctor(){
    this.router.navigate(['/addDoctor']);
  }
  view(doc:Doctor){
    console.log(doc)
  sessionStorage.setItem("editUserId", doc.doctorId.toString());
  sessionStorage.setItem("editDocStatus",doc.status.toString());
  this.router.navigate(['/doctor-view']);
  }
  statuschange(doc:Doctor){
    console.log(this.status2)
    sessionStorage.setItem("editUserId", doc.doctorId.toString());
    let userId = sessionStorage.getItem("editUserId");
    console.log(sessionStorage)
  
    let req ={

    }
    this.doctorservice.changeInactiveStatus(userId,this.status2,req).subscribe(
      data => this.handlerSucess1(data),
      error => this.handlerError1(error)
    )
  }
  handlerSucess1(data){
    this.getallinactivedata();

  sessionStorage.clear();
  console.log(sessionStorage)
  console.log('status changed')
  }
  handlerError1(error){
  console.log('STATUS NOT CHANGED ')
  }
  completeProfile(){
    this.router.navigate(['/hospital']);
  }
  getallactivedata(){
    this.searchString = '';
    this.searchanalayis = 'Active';
    this.ngOnInit();
  }
  getallinactivedata(){
    this.searchanalayis = 'Inactive';
    this.searchString = '';
    // this.page =0;
    let hospitalId = localStorage.getItem('currentuserId');
    this.doctorservice.getInactiveDoctor(this.pageInactive,hospitalId).subscribe(
       data => this.Sucess2(data),
       error => this.Error2(error)
     )
  }
  Sucess2(data){
    this.doctorslist=data['content'];
    this.pages =  new Array(data['totalPages']);
    console.log(this.doctorslist);
    this.Messages = 'Data found';
  }
  Error2(error){
    this.doctorslist = null;
    this.pages = null;
    this.Messages = error.error.error;
    console.log(error.error.error)
  }
  setinactivePage(i,event:any){
    event.preventDefault();
    this.pageInactive = i;
    this.getallinactivedata();
  }
  getallpendingdata(){
    this.searchanalayis = 'Pending';
    this.searchString = '';
    // this.page =0;
    let hospitalId = localStorage.getItem('currentuserId');
    this.doctorservice.getallPendingdoctor(this.pagePending,hospitalId).subscribe(
      data => this.Sucess1(data),
      error => this.Error1(error)
    )
  }
  Sucess1(data){
    this.doctorslist=data['content'];
    this.pages =  new Array(data['totalPages']);
    console.log(this.doctorslist)
    this.MessagesPending = 'Data found';
  }
  Error1(error){
    this.doctorslist = null;
    this.pages = null;
    this.MessagesPending = error.error.error;
    console.log(this.MessagesPending)
  }
  setPagePending(i,event:any){
  event.preventDefault();
  this.pagePending = i;
  this.getallpendingdata();
  }
  nextpage()
  {

    let count = this.i++;
    console.log(count)
    if(count == 0)
    {
      count = 1;
    }
      if(count < this.pages.length)
      {
      
        this.pagePending = count;
        console.log(this.pagePending)
        event.preventDefault();
        this.getallpendingdata();
      }
      if(count > this.pages.length)
      {
        return;
      }


  }
  pendingBack()
  {
    let count = this.pagePending;
    console.log(count)
    if(count == -1)
    {
      return;
    }
    if(count >0)
    {
      this.pagePending = count- 1;
      console.log(this.pagePending)
        event.preventDefault();
        this.getallpendingdata(); 
    }
  

    // this.pagePending = count;
    // console.log(this.pagePending)
    // event.preventDefault();
    // this.getallpendingdata();
    // if(count > 1)
    // {
    //   this.pagePending = count;
    //   console.log(this.pagePending)
    //   event.preventDefault();
    //   this.getallpendingdata();
    // }
  }
}
