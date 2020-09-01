import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-doc-info',
  templateUrl: './doc-info.component.html',
  styleUrls: ['./doc-info.component.css']
})
export class DocInfoComponent implements OnInit {
  DoctorDetails: any;
  apiUrl: any;

  constructor( @Inject(MAT_DIALOG_DATA) data,public dialog: MatDialog,private dialogRef: MatDialogRef<DocInfoComponent>)
   {
     console.log(data)
     this.DoctorDetails = data;
    }

  ngOnInit() {
    this.apiUrl = environment.apiUrl;

  }

}
