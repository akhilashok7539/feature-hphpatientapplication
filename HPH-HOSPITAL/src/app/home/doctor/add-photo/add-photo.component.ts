import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.css']
})
export class AddPhotoComponent implements OnInit {
  @Output() nextClickRegProof = new EventEmitter();

  public imagePath;
  imgURL: any;
  selectedFile: File
  public message: string;
  doctorId:any;
  currentFoto: any;
  files: any;
  formData = new FormData();
  constructor(private _activatedRoute:ActivatedRoute,
    private toaster:ToastrService,
    private _router: Router,private doctorService:DoctorService ){ }

  ngOnInit() {
    this.doctorId= JSON.parse(sessionStorage.getItem("editUserId")) ;
    console.log(this.doctorId)
    // this.datasharing.currentUserId.subscribe(userId =>this.doctorId = userId);
    // console.log(this.doctorId)
  }
  // next():void{
  //   this._router.navigate(['/']);
  // }
  nextRoutes(){
    this.nextClickRegProof.emit();
  }
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  addPhoto(event) {

    this.files = event.target.files;
    this.currentFoto = this.files.item(0);
    
    //  console.log(this.currentFoto)
  }

  next(){
    console.log(this.currentFoto)
    this.formData.append('profPic',this.currentFoto );
    console.log(this.formData)
    this.doctorId= JSON.parse(sessionStorage.getItem("editUserId")) ;
    console.log(this.doctorId)
    this.doctorService.uploadPhoto(this.formData,this.doctorId).subscribe(
     data =>this.handlersucess(data),
     error => this.handlerError(error),
   )
  }

  handlersucess(data){
    console.log(data)
    this.toaster.success('Photo added successfully');
    this.nextRoutes();
    // this._router.navigate(['/doc-id-proof']);
  }
  handlerError(error){
    this.formData.delete('profPic');
    console.log(error)
    this.toaster.error('Please add profile Picture');
  }

}
