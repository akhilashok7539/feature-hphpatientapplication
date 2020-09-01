import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../hospital/hospital.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
@Component({
  selector: 'app-completedappointments',
  templateUrl: './completedappointments.component.html',
  styleUrls: ['./completedappointments.component.css']
})
export class CompletedappointmentsComponent implements OnInit {
  appointmets: any;
  searchString:any;
  sortedCity :any = [];
  displayedColumns = ['bookId','patname', 'date','time','docname','status'];
  limit:number = 15;
  skip:number = 0;
  totalLength:number = 0;
  pageIndex : number = 0;
  pageLimit:number[] = [5, 10] ; 
  dataSource = new MatTableDataSource();
  filter :any ='';
  @ViewChild(MatPaginator ,{static:false}) paginator: MatPaginator;
  bookingIdvalue :any;
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
  constructor(private hospitalservice:HospitalService) { }

  ngOnInit() {
    this.hospitalservice.getallappointmentsconfirmed().subscribe(
      data =>{
        this.appointmets = data;
        this.totalLength = this.appointmets.length;
        this.dataSource.data = this.appointmets;
      },
      error =>{
        this.dataSource = new MatTableDataSource();
        this.appointmets = null;
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
    // console.log(filterValue)
    filterValue = filterValue.trim(); // Remove whitespace
    // filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    console.log(filterValue.trim())
    this.dataSource.filter = filterValue;
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
          // this.appointmets = data;
          let arr = [];
          arr.push(data)
          this.appointmets= arr;
          this.totalLength = this.appointmets.length;
          // console.log(data['length'])
          this.dataSource.data = this.appointmets;
        },
        error =>{
          this.dataSource = new MatTableDataSource();
          this.appointmets = null;
          this.totalLength = 0;
        }
      )
    }
     else if(this.selectevent == 'hospital')
    {
      console.log(this.selectevent)
      this.itemId ;
      var status = 'CONFIRMED';
      this.hospitalservice.getconfirmedAppointmentsbyhospital(this.itemId,status).subscribe(
        data =>{
          this.appointmets = data['content'];
          this.totalLength = this.appointmets.length;
          this.dataSource.data = this.appointmets;
        },
        error =>{
          this.dataSource = new MatTableDataSource();
          this.appointmets = null;
          this.totalLength = 0;
        }
      )
    }
    else if(this.selectevent == 'date')
    {
      console.log(this.selectevent)
      console.log(this.bookingIdvalue);
      var status = 'CONFIRMED';
      this.hospitalservice.getconfirmedAppointmentsbyDate(status,this.bookingIdvalue).subscribe(
        data =>{
          this.appointmets = data['content'];
          this.totalLength = this.appointmets.length;
          this.dataSource.data = this.appointmets;
        },
        error =>{
          this.dataSource = new MatTableDataSource();
          this.appointmets = null;
          this.totalLength = 0;
        }
      )
      
    }
    else if(this.selectevent == 'doctor')
    {
      console.log(this.selectevent)
      this.itemId;
      var status = 'CONFIRMED';
      this.hospitalservice.getconfirmedAppointmentsbyDoctor(this.itemId,status).subscribe(
        data =>{
          this.appointmets = data['content'];
          this.totalLength = this.appointmets.length;
          this.dataSource.data = this.appointmets;
        },
        error =>{
          this.dataSource = new MatTableDataSource();
          this.appointmets = null;
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