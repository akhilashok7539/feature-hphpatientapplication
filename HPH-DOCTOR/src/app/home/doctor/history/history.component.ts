import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DoctorService } from '../doctor.service';
import { Doctor } from 'src/app/_model/doctor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history:FormGroup;
  public doctorModel:Doctor;
  aa:boolean=false;
  doctorId:any;
  // doctors : Observable<Doctor[]>; 
  HospitalId:any;
  deptList:any;
  dateSelected:any;
  // clicked = false;
  private pages:Array<any>;
  private page:number=0;
  public searchString: string;
  categoryitems: any[];
  doctorSelected:any;
  docLeaveDetails:any;
  leaveForm :FormGroup;
  // public doctorModel:Doctor;
  timeselected: any;
  // history:any;
  historydata = [];
  constructor(private router:Router,private formBuilder: FormBuilder,
    private _activatedRoute:ActivatedRoute,private datePipe:DatePipe,
    private _router: Router,private doctorservice:DoctorService) { 
      this.doctorModel = new Doctor();
    }


  ngOnInit() {
    this.history = this.formBuilder.group({

      date:['',Validators.required]
    
    });
    var data = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    console.log(data);
    let userId = localStorage.getItem("currentuserId");
    this.doctorservice.getappointmentsHistory(this.page,data,userId).subscribe(
      data => this.handlersucess(data),
      error => this.handlerError(error)
    )
    this.dateSelected = data;
    
  }
  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.ngOnInit();
  }
  handlersucess(data){
    console.log(data)
    this.historydata=data['content'];
    this.pages =  new Array(data['totalPages']);
    console.log(this.historydata)
  }
  handlerError(error){
    console.log(error)
    this.historydata = null;
    this.pages = null;
  }
  getHistoryBydate(dateSelected){
    console.log(dateSelected)
    this.historydata = null;
    let userId = localStorage.getItem("currentuserId");
    this.doctorservice.getappointmentsHistory(this.page,dateSelected,userId).subscribe(
      data => this.handlersucess(data),
      error => this.handlerError(error)
    )

  }
}
