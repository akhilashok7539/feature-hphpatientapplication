import { Component, OnInit } from '@angular/core';
import { Search } from 'src/app/_models/search';
import { City } from 'src/app/_models/city';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchService } from './search.service';
import { environment } from 'src/environments/environment.prod';
import { BookedanappointmentSectionComponent } from './bookedanappointment-section/bookedanappointment-section.component';
import { DocInfoComponent } from './doc-info/doc-info.component';

@Component({
  selector: 'app-bookanappointment',
  templateUrl: './bookanappointment.component.html',
  styleUrls: ['./bookanappointment.component.css']
})
export class BookanappointmentComponent implements OnInit {
  searchform:FormGroup;
  categorys: [];
  city: City[];
  characters = []
  hospitalList: any;
  doctors = [];
  doctor = [];
  cityId: any;
  hospitalId: any;
  hospitalName: any;
  categoryId: any;
  doctorId: any;
  doctorlist: any;
  categoryitems = [];
  timeSlotes: any;
  keyword = 'key';
   page: number = 0;
   results: Array<any>;
   pages: Array<any>;
  // private 
  catselect:any;
  public searchModel: Search;
  CategorySelected:any = '';
  
  searchTextCtrl = new FormControl();
  // filteredOptions: Observable<string[]>;
  speciality = [];
  hospital = [];
  searchresults: number;
  selectid: number;
  citySelected: any ='';
   apiUrl: string;
  images: any;
  url:any;
  listdetails: string;
  sickness = [];
  constructor(public dialog: MatDialog, 
    private searchService: SearchService, private router: Router, private formBuilder: FormBuilder) {
    this.searchModel = new Search();
    this.searchTextCtrl  = new FormControl();
  }
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.newSearch();
  }
  ngOnInit() {

    this.apiUrl = environment.apiUrl;
    this.searchform = this.formBuilder.group({
      searchname: ['', Validators.required],
      category:['', Validators.required],
      cityName:['', Validators.required],

    });
    console.log(this.apiUrl)
    window.scrollTo(0, 0)
    this.searchService.getSpeciality().subscribe(
      data => {
        this.speciality = data;
        console.log(this.speciality)
      }
    )
    this.searchService.getCategory().subscribe(
      data => {
        this.categorys = data;
        console.log(this.categorys)
      }
    )
    this.searchService.getCity().subscribe(
      data => {
        this.city = data;
        console.log(this.city)
      }
    )
    this.searchService.getAllSickness().subscribe(
      data =>{
        this.sickness = data
      }
    )
    // console.log(this.citySelected)
  }
  docinfo(doc):void{
    const dialogRef = this.dialog.open(DocInfoComponent, {
      data: doc,
      height: '380px',
      // width: '400px',

    }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialog(doctorId): void {
    const dialogRef = this.dialog.open(BookedanappointmentSectionComponent, {
      data: doctorId,
      height: '380px',
      // width: '400px',

    }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // bookUnReg(doctorId): void {
  //   console.log(doctorId)
  //   const dialogRef = this.dialog.open(UnregpatComponent, {
  //     data: doctorId,
  //     height: '490px'
  //   }
  //   );
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }
  
  select(id) {
    this.selectid = id
    console.log(this.selectid)
  }
  check(id) {
    this.doctorId = id;
    //console.log(id)
  }
  selectEvent(item) {
    // do something with selected item
    console.log(item.id)
    // this.selecteditem = item
    this.selectid = item.id;
    this.page = 0;
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocused(e) {
    // do something when input is focused
  }
  getcityselected(citySelected){
    
    this.categoryitems = [];
    this.searchresults = null;
    this.CategorySelected = '';
    if(this.CategorySelected == ''){
      return;
    }
    else{
 
    this.searchService.gethospitalall(this.citySelected).subscribe(
      data => {
      
        this.hospitalList = data;
        console.log(this.hospitalList)
        for (let j = 0; j < this.hospitalList.length; j++) {
          this.categoryitems.push({
            'key': this.hospitalList[j].hospitalName,
            'id': this.hospitalList[j].hospitalId
          });
        }
      }
    )
         
  }
  }
  getcategroyType(cat) {
    this.categoryitems = [];
    console.log(cat);
    if (cat == 'Speciality') {
      this.catselect = 'speciality';
      this.searchresults = null;
      for (let j = 0; j < this.speciality.length; j++) {
        this.categoryitems.push({
          'key': this.speciality[j].description,
          'id': this.speciality[j].specId
        });
      }
      // this.categoryitems = this.speciality;
    }
    else if (cat == 'Hospital') {
      this.catselect = 'hospital';
      this.searchresults = null;
      this.searchService.gethospitalall(this.citySelected).subscribe(
        data => {
          // console.log(this.citySelected)
          this.hospitalList = data;
          console.log(this.hospitalList)
          for (let j = 0; j < this.hospitalList.length; j++) {
            this.categoryitems.push({
              'key': this.hospitalList[j].hospitalName,
              'id': this.hospitalList[j].hospitalId
            });
          }
        }
      )
    }
    else if(cat == 'Sickness')
    {
      console.log('sickness')
      this.catselect = 'sickness';
      this.searchresults = null;
      for(let j =0;j<this.sickness.length;j++)
      {
        this.categoryitems.push({
          "key":this.sickness[j].sicknessName,
          "id":this.sickness[j].sicknessId
        });
      }


    }  
  }
  newSearch() {
    // this.page = 0;
    if(this.citySelected == null && this.CategorySelected == null && this.searchresults == null )
    {
      console.log('hi')
      // this.toastr.error('Please choose what your want to search');
      
    }
    else
    {
      window.scrollTo(0,500)

      if (this.CategorySelected == 'Speciality') {
        this.searchService.Specilaity(this.page, this.citySelected, this.selectid).subscribe(
          data => this.handleSuccess2(data),
          error => this.errorhandle(error)
        );
      }
      else if (this.CategorySelected == 'Hospital') {
        this.searchService.gethospital(this.page, this.citySelected, this.selectid).subscribe(
          data => this.succesSearch(data),
          error => this.searchError(error)
        )
      }
      else if(this.CategorySelected == 'Sickness')
      {
        console.log('sicknes')
        this.searchService.getAllDocBYcityandSickness(this.page,this.citySelected,this.selectid).subscribe(
          data =>this.succesSearch1(data),
          error => this.searchError1(error)

        )
      }
    }
  }


  succesSearch1 (data)
  {
    window.scrollTo(0,500)

    this.results = data['content'];
    const itemIds = [];
    for (var i = 0; i < data.totalPages; i++) {
      itemIds.push(data[i]);
    }
    console.log(itemIds)
    this.pages = itemIds
    // this.pages =  new Array(data,['totalPages']);
    //this.toastr.success('Search Succesfully Completed');
    window.scrollTo(0,500)
    this.listdetails = 'Search results';

    console.log(this.results)
  }
  searchError1(error)
  {
    window.scrollTo(0,500)

    this.results = null;
    this.pages = [];
    window.scrollTo(0,500)
    this.listdetails = 'Search Not Found';
  }
  handleSuccess2(data) {
    window.scrollTo(0,500)
    
    this.results = data['content'];
    const itemIds = [];
    for (var i = 0; i < data.totalPages; i++) {
      itemIds.push(data[i]);
    }
    console.log(itemIds)
    this.pages = itemIds
    // this.pages =  new Array(data,['totalPages']);
    //this.toastr.success('Search Succesfully Completed');
    window.scrollTo(0,500)
    this.listdetails = 'Search results';

    console.log(this.results)
  }
  errorhandle(error) {
    window.scrollTo(0,500)

    this.results = null;
    this.pages = [];
    this.listdetails = 'Search Not Found';
    //this.toastr.error('Sorry we couldnt find any doctors ');
    //this.toastr.error('Search UnSuccesfully ');
  }
  succesSearch(data) {
    window.scrollTo(0,500)

    this.results = data['content'];
    const itemIds = [];
    for (var i = 0; i < data.totalPages; i++) {
      itemIds.push(data[i]);
    }
    console.log(itemIds)
    this.pages = itemIds
    //this.pages =  new Array(data,['totalPages']);
    //this.toastr.success('Search Succesfully Completed');
    this.listdetails = 'Search results';
    console.log(this.results)
  }
  searchError(error) {
    window.scrollTo(0,500)

    this.results = null;
    this.pages = [];
    this.listdetails = 'Search Not Found';
    //this.toastr.error('Sorry we couldnt find any doctors ');
  }
}
