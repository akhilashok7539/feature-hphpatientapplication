import { Component, OnInit, ViewChild } from '@angular/core';
import { HospitalService } from '../hospital/hospital.service';
import { environment } from 'src/environments/environment.prod';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DepartmentService } from '../department/department.service';
@Component({
  selector: 'app-alldoctorslist',
  templateUrl: './alldoctorslist.component.html',
  styleUrls: ['./alldoctorslist.component.css']
})
export class AlldoctorslistComponent implements OnInit {
  doctors: any;
  apiUrl: string;
  displayedColumns = ['docId', 'docname', 'spec', 'hospname', 'pic', 'view'];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10, 15];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  myControl = new FormControl();
  options: Specility[] = [];


  filteredOptions: Observable<Specility[]>;

  hospitalList: any;

  citys: any;
  citySelected = '';
  CategorySelected = '';
  deptList: any;
  searchseleted: any;
  selectedvalue: any;
  docFilterValue: string;
  constructor(private hospitalservice: HospitalService, private router: Router, private departService: DepartmentService) {

  }

  ngOnInit() {
    
    this.apiUrl = environment.apiUrl;
    this.hospitalservice.getAllDoctors().subscribe(
      data => {
        this.doctors = data;
        console.log(this.doctors)
        this.totalLength = this.doctors.length;
        this.dataSource.data = this.doctors;
      },
      error => {

      }
    )
    this.getallCitys();
  }
  changePage(event) {
    console.log(event)
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  view(viewDoctor) {
    console.log(viewDoctor.doctorId)
    this.router.navigate(['viewDoctor', viewDoctor.doctorId]);
  }
  getallCitys() {
    this.departService.getCity().subscribe(
      data => {
        this.citys = data;
      })
  }
  getcityselected(city) {
    console.log(city)
    this.citySelected = city;
    this.CategorySelected = '';
  }
  getcategroyType(cat) {
    if (cat == 'Specility') {
      this.searchseleted = '';
      this.departService.getDepartments().subscribe(
        data => {
          this.deptList = data;
          this.options = this.deptList;
          console.log(this.options)
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(state => state ? this._filterStates(state) : this.options.slice())
            );
        })

    }
    else if (cat == 'Hospital') {
      this.searchseleted = '';
      this.filteredOptions = null;
      this.departService.gethospitalall(this.citySelected).subscribe(
        data => {
          this.hospitalList = data;
          console.log(this.hospitalList)
          if (this.hospitalList == null) {
            this.filteredOptions = null;
            return;
          }
          let hospitalitem = [];
          for (let j = 0; j < this.hospitalList.length; j++) {
            hospitalitem.push({
              'description': this.hospitalList[j].hospitalName,
              'specId': this.hospitalList[j].hospitalId
            });
          }
          this.options = hospitalitem;
          console.log(this.options)
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(state => state ? this._filterStates(state) : this.options.slice())
            );
        },
        error => {

        }
      )
    }
    else if (cat == 'Doctor') {
      let hospitalitem = [];
      for (let j = 0; j < this.doctors.length; j++) {
        hospitalitem.push({
          'description': this.doctors[j].firstName,
          'specId': this.doctors[j].doctorId
        });
      }
      this.options = hospitalitem;
      console.log(this.options)
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.options.slice())
        );
    }
  }
  private _filterStates(value: string): Specility[] {
    const filterValue = value.toLowerCase();
    console.log(filterValue)
    this.docFilterValue = filterValue;
    return this.options.filter(state => state.description.toLowerCase().indexOf(filterValue) === 0);
  }

  search() {

    if (this.CategorySelected == 'Specility') {
      this.departService.Specilaity(this.pageIndex, this.citySelected, this.selectedvalue).subscribe(
        data => {
          this.doctors = data['content'];
          this.dataSource.data = this.doctors;
        },
        error => {
          this.dataSource = new MatTableDataSource();
          this.totalLength = 0;

        }
      );
    }
    else if (this.CategorySelected == 'Hospital') {
      this.departService.gethospital(this.pageIndex, this.citySelected, this.selectedvalue).subscribe(
        data => {
          this.doctors = data['content'];
          this.dataSource.data = this.doctors;
        },
        error => {
          this.dataSource = new MatTableDataSource();
          this.totalLength = 0;
        }
      )
    }
    else if (this.CategorySelected == 'Doctor') {

      this.dataSource.filter = this.docFilterValue;
    }

  }
  select(event) {
    console.log(event)
    this.selectedvalue = event;
  }
}
export interface Specility {
  specId: string;
  description: string;
  hospitalId: string;
  hospitalName: string;
}
export interface Hospital {


}
