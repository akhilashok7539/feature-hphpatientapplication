import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from './hospital.service';
import { Doctor } from '../_models/doctor';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../department/department.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  hospitalLists: any;
  pages: Array<any>;
  page: number = 0;
  doctorslist = [];
  searchString: any;
  results: Observable<Doctor[]>;
  public status1 = "INACTIVE";
  public status2 = "ACTIVE";
  profileId = 6;
  values: any;
  fliter: any;
  search: any;
  citys: any;
  cityId: any = '';
  citySeleted: any;
  messages: string;
  totalpages: any;
  // totalLength:number = 0;
  displayedColumns = ['Hospitalname', 'contactno', 'city', 'status', 'edit', 'view', 'inactive'];

  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [1, 5, 10, 15];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private router: Router, private departService: DepartmentService,
    private hospitalService: HospitalService, private toaster: ToastrService) { }

  ngOnInit() {
    this.hospitalService.getAllHospital(this.page).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
    this.getallCitys();
  }
  setPage(i, event: any) {
    console.log('pagination active')
    event.preventDefault();
    this.page = i;

    this.ngOnInit();


  }
  getcitSelected(event) {
    console.log(event.target.value)
    this.citySeleted = event.target.value;
    console.log(this.citySeleted)
    this.hospitalService.getallhospitalbycitySelected(this.page, this.citySeleted).subscribe(
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
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onKey(event: any) {
    this.page = 0;
    this.values = event.target.value;
    console.log(this.values)
    this.hospitalService.searchActiveHospital(this.page, this.values).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )

  }

  buttonselected(cat) {
    this.doctorslist = [];
    if (cat === 'Active') {
      console.log('Active list will display')
      this.hospitalService.getAllHospital(this.page).subscribe(
        data => this.handlerSucess(data),
        error => this.handlerError(error)
      )
    }
    else if (cat === 'Pending') {
      console.log('Pending list will display')
      // this.hospitalService.getallPendinghospitals(this.page).subscribe(
      //   data => this.Sucess1(data),
      //   error => this.Error1(error)
      // )
      this.router.navigate(['/hospital/pending']);
    }
    else if (cat === 'In-Active') {
      console.log('Listed list will display')
      // this.hospitalService.getInactivehsopitalList(this.page).subscribe(
      //   data => this.Sucess2(data),
      //   error => this.Error2(error)
      // )
      this.router.navigate(['/hospital/In-active']);
    }
  }

  addHsopital() {
    this.router.navigate(['/AddHospital']);
  }

  handlerSucess(data) {

    this.doctorslist = data['content'];
    this.pages = new Array(data['totalPages']);
    console.log(this.doctorslist)
    this.totalLength = data['totalElements'];
    console.log(this.totalLength)
    this.dataSource.data = this.doctorslist;
  }
  handlerError(error) {
    this.dataSource = new MatTableDataSource();
    this.doctorslist = [];
    this.dataSource.data = null;
    console.log(this.totalLength)
    this.totalLength = 0;
    this.messages = 'No Hospital Found';
  }
  Sucess1(data) {

    this.doctorslist = data['content'];
    this.pages = new Array(data, ['totalPages']);
    console.log(this.doctorslist)
  }
  Sucess2(data) {
    this.doctorslist = data['content'];
    this.pages = new Array(data, ['totalPages']);
    console.log(this.doctorslist)
  }
  Error2(error) {

  }
  Error1(error) {

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


  statuschange(hospitals: Doctor) {
    console.log(this.status1)
    console.log(this.profileId)
    sessionStorage.setItem("hospitalId", hospitals.hospitalId.toString());
    let userId = sessionStorage.getItem("hospitalId");
    console.log(sessionStorage)

    let req = {

    }
    this.hospitalService.changeStatus(userId, this.status1, this.profileId, req).subscribe(
      data => this.handlerSucess1(data),
      error => this.handlerError1(error)
    )
  }


  handlerSucess1(data) {
    this.toaster.success('Hospital Inactivated Successfully');
    console.log('status changedd')
    this.ngOnInit();
    sessionStorage.clear();
    console.log(sessionStorage)
  }
  handlerError1(error) {
    console.log('STATUS NOT CHANGEDD ')
  }

  status(hospitals: Doctor) {
    console.log(this.status2)
    sessionStorage.setItem("hospitalId", hospitals.hospitalId.toString());
    let userId = sessionStorage.getItem("hospitalId");
    console.log(sessionStorage)


    let req = {

    }
    this.hospitalService.StatusUpdated(userId, this.status2, this.profileId, req).subscribe(
      data => this.handlerSucess2(data),
      error => this.handlerError2(error)
    )

  }


  handlerSucess2(data) {
    this.toaster.success('Hospital activated successfully');
    console.log('status changedd')
    this.ngOnInit();
    sessionStorage.clear();
    console.log(sessionStorage)
  }
  handlerError2(error) {
    console.log('STATUS NOT CHANGEDD ')
  }

  getseletected(fliter) {
    console.log(fliter);

  }
  getallCitys() {
    this.departService.getCity().subscribe(
      data => {
        this.citys = data;
        console.log(this.citys)

      })
  }
  changePage(event) {
    console.log(event)

    console.log(event.pageIndex)
    this.hospitalService.getAllHospital(event.pageIndex).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
  }
  percentage(element)
  {
    console.log(element)
    sessionStorage.setItem("hospitalId", element.hospitalId.toString());
    this.router.navigate(['/percentage']);
  }
}

