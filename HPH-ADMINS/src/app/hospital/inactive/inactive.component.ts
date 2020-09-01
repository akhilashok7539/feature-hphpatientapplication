import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/_models/doctor';
import { Router } from '@angular/router';
import { HospitalService } from '../hospital.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DepartmentService } from 'src/app/department/department.service';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.css']
})
export class InactiveComponent implements OnInit {
  hospitalLists: any;
  pages: Array<any>;
  page: number = 0;
  searchString: any;

  doctorslist = [];
  results: Observable<Doctor[]>;
  public status1 = "INACTIVE";
  public status2 = "ACTIVE";
  profileId = 6;
  values: any;

  displayedColumns = ['Hospitalname', 'contactno', 'city', 'status', 'edit', 'view', 'inactive'];

  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [1, 5, 10, 15];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  messages: string;
  citys: any;
  cityId: any = '';
  citySeleted:any;
  constructor(private router: Router, private departService: DepartmentService,
    private hospitalService: HospitalService, private toaster: ToastrService) { }


  ngOnInit() {
    this.hospitalService.getInactivehsopitalList(this.page).subscribe(
      data => this.Sucess2(data),
      error => this.Error2(error)
    )
    this.getallCitys();
  }
  onKey(event: any) { // without type info
    this.page = 0;
    this.values = event.target.value;
    console.log(this.values)
    this.hospitalService.searchInActiveHospital(this.page, this.values).subscribe(
      data => this.Sucess2(data),
      error => this.Error2(error)
    )

  }
  Sucess2(data) {
    this.doctorslist = data['content'];
    this.pages = new Array(data['totalPages']);
    console.log(this.doctorslist)
    this.totalLength = data['totalElements'];
    console.log(this.totalLength)
    this.dataSource.data = this.doctorslist;
    this.messages = ' Hospital Found';

  }
  Error2(error) {
    this.dataSource = new MatTableDataSource();
    this.doctorslist = [];
    this.dataSource.data = null;
    console.log(this.totalLength)
    this.totalLength = 0;
    this.messages = 'No Hospital Found';
  }
  setInactive(i, event: any) {
    console.log('pagination inactive')
    event.preventDefault();
    this.page = i;
    this.ngOnInit();
  }
  changePage(event) {
    this.hospitalService.getInactivehsopitalList(event.pageIndex).subscribe(
      data => this.Sucess2(data),
      error => this.Error2(error)
    )
  }
  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;



  }
  getallCitys() {
    this.departService.getCity().subscribe(
      data => {
        this.citys = data;
        console.log(this.citys)

      })
  }
  edit(hospitals: Doctor) {
    sessionStorage.clear();
    sessionStorage.setItem("hospitalId", hospitals.hospitalId.toString());
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
      this.router.navigate(['/hospital/pending']);
    }
    else if (cat === 'In-Active') {
      console.log('Listed list will display')
      this.hospitalService.getInactivehsopitalList(this.page).subscribe(
        data => this.Sucess2(data),
        error => this.Error2(error)
      )
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  addHsopital() {
    this.router.navigate(['/AddHospital']);
  }

  statuschange(hospitals: Doctor) {
    console.log(this.status1)
    console.log(this.profileId)
    sessionStorage.setItem("hospitalId", hospitals.hospitalId.toString());
    let userId = sessionStorage.getItem("hospitalId");
    console.log(sessionStorage)

    let req = {

    }
    this.hospitalService.changeStatus(userId, this.status2, this.profileId, req).subscribe(
      data => this.handlerSucess1(data),
      error => this.handlerError1(error)
    )
  }


  handlerSucess1(data) {

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
    this.toaster.success('Hospital Activated Successfully')
    console.log('status changedd')
    this.ngOnInit();
    sessionStorage.clear();
    console.log(sessionStorage)
  }
  handlerError2(error) {
    console.log('STATUS NOT CHANGEDD ')
  }
  getcitSelected(event) {
    console.log(event.target.value)
    this.citySeleted = event.target.value;
    console.log(this.citySeleted)
    this.hospitalService.getallhospitalbycitySelectedInactive(this.page, this.citySeleted).subscribe(
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
}
