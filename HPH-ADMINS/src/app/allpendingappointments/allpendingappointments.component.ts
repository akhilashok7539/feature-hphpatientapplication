import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DatePipe } from '@angular/common';
import { HospitalService } from '../hospital/hospital.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-allpendingappointments',
  templateUrl: './allpendingappointments.component.html',
  styleUrls: ['./allpendingappointments.component.css']
})
export class AllpendingappointmentsComponent implements OnInit {
  currentdate;
  pending: any =[];
  searchString:any;
  sortedCity :any = [];
  displayedColumns = ['bookId','patname', 'date','time','docname'];
  limit:number = 15;
  skip:number = 0;
  totalLength:number = 0;
  pageIndex : number = 0;
  pageLimit:number[] = [5, 10] ; 
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator ,{static:false}) paginator: MatPaginator;
  bookingIdvalue :any;
  filter :any ='';

  searchseleted ;
  myControl = new FormControl();
  selectevent :any;
  hospitalList: any;
  // options= [];
  // filteredOptions:any=[];
  docFilterValue: any;
  options: search[] = [];
  itemId :any;
  doctorList:any = [];
  filteredOptions: Observable<search[]>;
  constructor(private datePipe: DatePipe, private hospitalservice:HospitalService) { }

  ngOnInit() {
    var data = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    console.log(data);
    this.currentdate = data;
    this.getallPendingappointments();
  }
  getpendingBydate(dateSelected){
    console.log(dateSelected)
  }
  getallPendingappointments(){
    this.hospitalservice.getallPendingappointments().subscribe(
      data =>{
        console.log(data)
        this.pending = data;
        this.totalLength = this.pending.length;
        this.dataSource.data = this.pending;
      },
      error =>{
        this.dataSource = new MatTableDataSource();
        this.pending = null;
        this.totalLength = 0;
      }
    )
  }
  changePage(event){
    console.log(event)
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  applyFilter(filterValue: string) {
   
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    console.log(this.dataSource.filter)
  }

  filterselect(e){
    console.log(e)
    this.selectevent = e;
    if(e == 'bookingid')
    {
      // this.bookingIdvalue = this.bookingIdvalue;
      this.bookingIdvalue = '';
      this.searchseleted = '';

    }
    else if(e == 'hospital'){
      this.bookingIdvalue = '';
      this.searchseleted = '';
      this.hospitalservice.getallactivehospitallist().subscribe(
        data =>{
          this.hospitalList =  data['content'];
          this.options = this.hospitalList;
          console.log(this.options)
          let hospitalitem = [];
          for (let j = 0; j < this.hospitalList.length; j++) {
            hospitalitem.push({
              'name': this.hospitalList[j].hospitalName,
              'Id': this.hospitalList[j].hospitalId
            });
          }
          this.options = hospitalitem;
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(state => state ? this._filterStates(state) : this.options.slice())
            );
        },
        error =>{

        }
      )
    }
    else if(e == 'date'){
      this.bookingIdvalue = '';
      this.searchseleted = '';

    }
    else if(e == 'doctor'){
      this.bookingIdvalue = '';
      this.searchseleted = '';

      this.hospitalservice.getAllDoctors().subscribe(
        data =>{
          // let doctorList = [];
          this.doctorList  = data;
          console.log(this.doctorList)
          let doctor = [];

          for (let j = 0; j < this.doctorList.length; j++) {
            doctor.push({
              'name': this.doctorList[j].firstName,
              'Id': this.doctorList[j].doctorId
            });
          }
          this.options = doctor;
        console.log(this.options)
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.options.slice())
        );
        },
        error =>{

        }
      )
    }
  }
  private _filterStates(value: string) {
    const filterValue = value.toLowerCase();
    console.log(filterValue)
    this.docFilterValue = filterValue;
    return this.options.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
  select(e)
  {
    console.log(e.Id)
    this.itemId  = e.Id;
  }
  search()
  {
    if(this.selectevent == 'bookingid')
    {
      console.log(this.bookingIdvalue)
      this.hospitalservice.getappointmetnsbyBookingId(this.bookingIdvalue).subscribe(
        data =>{
          // this.pending = data;
          let arr = [];
          arr.push(data)
          this.pending= arr;
          console.log(this.pending.length)
          this.totalLength = this.pending.length;
          this.dataSource.data = this.pending;
          
          console.log(this.dataSource.data)
        },
        error =>{
          this.dataSource = new MatTableDataSource();
          this.pending = null;
          this.totalLength = 0;
        }
      )
    }
     else if(this.selectevent == 'hospital')
    {
      console.log(this.selectevent)
      this.itemId ;
      var status = 'PENDING';
      this.hospitalservice.getconfirmedAppointmentsbyhospital(this.itemId,status).subscribe(
        data =>{
          this.pending = data;
          this.totalLength = this.pending.length;
          this.dataSource.data = this.pending;
        },
        error =>{
          this.dataSource = new MatTableDataSource();
          this.pending = null;
          this.totalLength = 0;
        }
      )
    }
    else if(this.selectevent == 'date')
    {
      console.log(this.selectevent)
      console.log(this.bookingIdvalue);
      var status = 'PENDING';
      this.hospitalservice.getconfirmedAppointmentsbyDate(status,this.bookingIdvalue).subscribe(
        data =>{
          this.pending = data['content'];
          this.totalLength = this.pending.length;
          this.dataSource.data = this.pending;
        },
        error =>{
          this.dataSource = new MatTableDataSource();
          this.pending = null;
          this.totalLength = 0;
        }
      )
      
    }
    else if(this.selectevent == 'doctor')
    {
      console.log(this.selectevent)
      this.itemId;
      var status = 'PENDING';
      this.hospitalservice.getconfirmedAppointmentsbyDoctor(this.itemId,status).subscribe(
        data =>{
          this.pending = data['content'];
          this.totalLength = this.pending.length;
          this.dataSource.data = this.pending;
        },
        error =>{
          this.dataSource = new MatTableDataSource();
          this.pending = null;
          this.totalLength = 0;
        }
      )
    }
   
  }
}
export interface search {
  Id: string;
  name: string;
 
}