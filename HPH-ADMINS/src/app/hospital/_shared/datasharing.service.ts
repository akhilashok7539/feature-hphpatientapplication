import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

  private  hospitalId = new BehaviorSubject('hospitalId');
 
  currentUserId = this.hospitalId.asObservable();
  constructor() { }

  changeDoctorId(hospitalId:string){
    this.hospitalId.next(hospitalId);
  }
}
