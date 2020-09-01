import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from '../department/department.service';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  citys: any;
  searchString: any;
  sortedCity: any = [];
  displayedColumns = ['Cityname', 'Delete',];
  limit: number = 15;
  skip: number = 0;
  totalLength: number = 0;
  pageIndex: number = 0;
  pageLimit: number[] = [5, 10];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // @ViewChild(MatSort ,{static:true}) sort: MatSort;
  constructor(private router: Router, private departService: DepartmentService, private toaster: ToastrService) { }

  ngOnInit() {

    this.departService.getCity().subscribe(
      data => {
        this.citys = data;
        this.sortedCity = this.citys.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
    
     
        this.totalLength = this.citys.length;
        this.dataSource.data = this.citys;
        // this.sortedData = this.desserts.slice();
      })
    // this.dataSource.sort = this.sort;

  }
  city() {
    this.router.navigate(['/addcity']);
  }

  delete(c) {
    sessionStorage.setItem("cityId", c.cityId.toString());

    let cityUid = sessionStorage.getItem("cityId");
    // console.log(userId)
    this.departService.deleteCity(cityUid).subscribe(
      data => this.handlerSucess(data),
      error => this.handlerError(error)
    )
  }
  handlerSucess(data) {
    console.log('City deleted sucessfullty');
    this.toaster.success('City deleted successfully')
    sessionStorage.clear()
    console.log(data)

    this.ngOnInit();
  }
  handlerError(error) {
    console.log(error)
    this.toaster.error('Unable to delete city ')

  }
  sortData(sort: Sort) {
    console.log(sort)
    const data = this.citys.slice();
    console.log(data)
    if (!sort.active || sort.direction === '') {
      this.citys = data;
      return;
    }

    this.citys = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Cityname': return compare(a.name, b.name, isAsc);

        default: return 0;
      }
    });
  }
  changePage(event) {
    console.log(event)
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;


  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}