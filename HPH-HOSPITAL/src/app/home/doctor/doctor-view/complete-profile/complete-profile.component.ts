import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css']
})
export class CompleteProfileComponent implements OnInit {
  doctorId: string;
  results: Object;

  doctorsymptoms =[];
  value: any;
  completeprofile = 'Complete Profile';
  isLoading = false;
  constructor(private router:Router,private doctorservice:DoctorService,private toaster:ToastrService) { }

  ngOnInit() {
  }
 
  changeStatus(){
    this.isLoading = true;
    this.completeprofile = 'Processing';

    this.doctorId=sessionStorage.getItem("editUserId");
    console.log(this.doctorId)
    this.doctorservice.changeStatusHospital(this.doctorId).subscribe(
      data => this.handlerSuess(data),
      error =>this.handlerError(error)
    )
  }
  handlerSuess(data){
    this.isLoading = false;
    this.completeprofile = 'Complete Profile';

    this.toaster.success('Doctor Profile is successfully completed. Login credentials mail to the registered mail ID')
    this.router.navigate(['/Doctor']);
  }
  handlerError(error){
    this.isLoading = false;
    this.completeprofile = 'Complete Profile';

  }
}
