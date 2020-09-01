import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private status:any;
  private apiUrl:string;
  constructor(private httpClient:HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  adminLogin(req){
    return this.httpClient.post(this.apiUrl+'/login',req).pipe
    (map(res=>{
      if(res){
        this.loggedIn.next(true);
        // this.loggedIn.next(true);
        const dataRes:any = res;
        
        // const uId:any = dataRes.patientId;
        // const userdata:any = dataRes.firstName;
        //console.log(userdata)
          localStorage.setItem('admin',JSON.stringify(res));
        //to get patient id
          // localStorage.setItem('currentPatientid',uId);
      }
      return res;
      })

    );
  }
}
