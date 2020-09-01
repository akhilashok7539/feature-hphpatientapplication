import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private  values = new BehaviorSubject('values');
 
  currentUserId = this.values.asObservable();
  constructor() { }

  changeDoctorId(values:any){
    this.values.next(values);
  }

}
