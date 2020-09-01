import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl :string;

  constructor(private http:HttpClient,
    private router:Router) { 
      // this.apiUrl = environment.apiUrl;
      this.apiUrl = environment.apiUrl;
      // console.log(this.apiUrl)
    }
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
      return this.loggedIn.asObservable();
    }
    login(req){
      return this.http.post(this.apiUrl+'/login',req).pipe
      (map(res=>{
        if(res)
        {
        this.loggedIn.next(true);
        const dataRes:any = res;
        const uId:any = dataRes.profileStatus;
        const userId:any = dataRes.hospitalId;
        localStorage.setItem('CurrentHospital',JSON.stringify(res));
        console.log(localStorage)
        localStorage.setItem('currentuserId',userId);
        localStorage.setItem('currentstatus',uId);
        }
        return res;
        })
  
      );
     }
     loginadministrator(req)
     {
      return this.http.post(this.apiUrl+'/login',req);

     }
     resetPasswordEmail(req){
      return this.http.post(this.apiUrl+'/reset-password',req);
    }
    onlogout(){
     this.loggedIn.next(false);
     localStorage.clear();
     console.log(localStorage)
     console.log(this.loggedIn)
     console.log("logout sucessfully")
     this.router.navigate(['/Login']);
    }
}
