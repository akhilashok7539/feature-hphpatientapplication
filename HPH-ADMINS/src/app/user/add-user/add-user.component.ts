import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userform:FormGroup;
  departmentModel: User;
  submitted = false;
  profileId = 11;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.departmentModel = new User();
    this.userform = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      hospitalId:['',Validators.required],
      destinationId:['',Validators.required],
      passoword:['',Validators.required],
    })
  }
  get f() { return this.userform.controls; }

  create()
  {
    this.submitted = true;
    if (this.userform.invalid) {
      console.log('invalid')

      return;
    }
    else if (this.userform.valid) {

    }

  }
  getallHopsital(){
    
  }
}
