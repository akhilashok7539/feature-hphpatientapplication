import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/_models/doctor';
import { Router } from '@angular/router';
import { HospitalService } from '../hospital.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DepartmentService } from 'src/app/department/department.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  hospitalLists: any;
  pages: Array<any>;
  page: number = 0;
  doctorslist = [];
  results: Observable<Doctor[]>;
  public status1 = "INACTIVE";
  public status2 = "ACTIVE";
  profileId = 6;
  values: any;
  searchString: any;
  messages: string;

  displayedColumns = ['Hospitalname', 'contactno', 'city', 'status', 'edit', 'view'];

  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [1, 5, 10, 15];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  citys: any;
  cityId: any = '';
  citySeleted: any;
  constructor(private router: Router, private hospitalService: HospitalService,private departService:DepartmentService) { }

  ngOnInit() {
    this.hospitalService.getallPendinghospitals(this.page).subscribe(
      data => this.Sucess1(data),
      error => this.Error1(error)
    )
    this.getallCitys();

  }
  getallCitys() {
    this.departService.getCity().subscribe(
      data => {
        this.citys = data;
        console.log(this.citys)

      })
  }
  getcitSelected(event) {
    console.log(event.target.value)
    this.citySeleted = event.target.value;
    console.log(this.citySeleted)
    this.hospitalService.getallhospitalbycitySelectedPending(this.page, this.citySeleted).subscribe(
      data => {
        console.log(data)
        this.doctorslist = data['content'];
        // this.pages =  new Array(data['totalPages']);
        // this.totalpages = data['totalPages'];
        // console.log(this.totalpages )
        this.dataSource.data = this.doctorslist;
        this.totalLength = data['totalElements'];
        console.log(this.totalLength)
        this.messages = ' Hospital Found';

      },
      error => {
        this.dataSource = new MatTableDataSource();
        this.doctorslist = [];
        this.dataSource.data = null;
        console.log(this.totalLength)
        this.totalLength = 0;
        this.messages = 'No Hospital Found';
      }
    )
  }
  setPending(i, event: any) {
    console.log('pagination pending')
    event.preventDefault();
    this.page = i;
    this.ngOnInit();
  }
  onKey(event: any) { // without type info
    this.page = 0;
    this.values = event.target.value;
    console.log(this.values)
    this.hospitalService.searchPendingHospital(this.page, this.values).subscribe(
      data => this.Sucess1(data),
      error => this.Error1(error)
    )

  }
  Sucess1(data) {

    this.doctorslist = data['content'];
    this.pages = new Array(data['totalPages']);
    console.log(this.doctorslist);
    this.totalLength = data['totalElements'];
    console.log(this.totalLength)
    this.dataSource.data = this.doctorslist;
    this.messages = ' Hospital Found';
  }
  Error1(error) {
    this.dataSource = new MatTableDataSource();
    this.doctorslist = [];
    this.dataSource.data = null;
    console.log(this.totalLength)
    this.totalLength = 0;
    this.messages = 'No Hospital Found';
  }
  edit(hospitals: Doctor) {
    sessionStorage.clear();
    sessionStorage.setItem("hospitalId", hospitals.hospitalId.toString());
    sessionStorage.setItem("edituserStatus", hospitals.profileStatus);
    console.log(sessionStorage)
    this.router.navigate(['/edithospital']);
  }
  view(hospitals: Doctor) {
    sessionStorage.clear();
    sessionStorage.setItem("hospitalId", hospitals.hospitalId.toString());
    console.log(sessionStorage)
    this.router.navigate(['/view']);
  }

  buttonselected(cat) {
    this.doctorslist = [];
    if (cat === 'Active') {
      console.log('Active list will display')
      this.router.navigate(['/Hospital'])
    }
    else if (cat === 'Pending') {
      console.log('Pending list will display')
      this.hospitalService.getallPendinghospitals(this.page).subscribe(
        data => this.Sucess1(data),
        error => this.Error1(error)
      )
    }
    else if (cat === 'In-Active') {
      console.log('Listed list will display')
      this.router.navigate(['/hospital/In-active']);
    }
  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;



  }
  changePage(event) {
    this.hospitalService.getallPendinghospitals(event.pageIndex).subscribe(
      data => this.Sucess1(data),
      error => this.Error1(error)
    )
  }
  addHsopital() {
    this.router.navigate(['/AddHospital']);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
