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

  private status: any;
  private apiUrl: string;
  results: any = [];
  dataRes: any;
  userId: any;
  uId: any;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;
  }

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  userLogIn(req) {
    return this.httpClient.post(this.apiUrl + '/login', req).pipe
      (map(res => {
        if (res) {
          // console.log(res)
          this.loggedIn.next(true);
          // this.loggedIn.next(true);
          this.results = res;
          console.log(this.results)
          for (let i = 0; i < this.results.length; i++) {
            if (this.results[i].status == 'ACTIVE') {
              console.log(this.results[i - 1].status)

              localStorage.setItem('currentdoctor', JSON.stringify(res));
              console.log(this.results[i].status + 'enter ACTIVE')
              this.dataRes = res[i];
              this.uId = this.dataRes.status;
              console.log(this.uId)
              this.userId = this.dataRes.doctorId;
              console.log(this.userId)
              localStorage.setItem('currentuserId', this.userId);
              localStorage.setItem('currentstatus', this.uId);
              localStorage.setItem('currentselectedDoctor', JSON.stringify([this.dataRes]));
              return;
            }

            // else if(this.results[i -1].status == 'UNAPPROVED')
            // {
            //   console.log(this.results[i].status+'enter unapproved')
            //   this.dataRes = res[i];
            //   this.uId = this.dataRes.status;
            //   this.userId= this.dataRes.doctorId;

            // }

          }
          // if (this.results[i].status == 'PENDING') {
          //   console.log(this.results[i].status + 'enter PENDING')

          //   localStorage.setItem('currentdoctor', JSON.stringify(res));
          //   this.dataRes = res[i];

          //   this.uId = this.dataRes.status;
          //   console.log(this.uId)
          //   this.userId = this.dataRes.doctorId;
          //   console.log(this.userId)
          //   localStorage.setItem('currentselectedDoctor', JSON.stringify(res[i]));

          //   localStorage.setItem('currentuserId', this.userId);
          //   localStorage.setItem('currentstatus', this.uId);
          //   return;
          // }



        }
        for (let i = 0; i < this.results.length; i++) {
          if (this.results[i].status == 'PENDING') {
            console.log(this.results[i].status)


            if (this.results[i].privatePratice == false) {

            }
            else if (this.results[i].privatePratice == true) {
              localStorage.setItem('currentdoctor', JSON.stringify(res));
              console.log(this.results[i].status + 'enter PENDING')

              this.dataRes = res[i+1];
              this.uId = this.dataRes.status;
              console.log(this.uId)
              this.userId = this.dataRes.doctorId;
              console.log(this.userId)
              localStorage.setItem('currentuserId', this.userId);
              localStorage.setItem('currentstatus', this.uId);

              localStorage.setItem('currentselectedDoctor', JSON.stringify(res[i + 1]));
            }


            return;
          }



        }
        for (let i = 0; i < this.results.length; i++) {
          if (this.results[i].status == 'UNAPPROVED') {
            console.log(this.results[i].status)

            localStorage.setItem('currentdoctor', JSON.stringify(res));
            console.log(this.results[i].status + 'enter UNAPPROVED')
            this.dataRes = res[i +1];
            this.uId = this.dataRes.status;
            console.log(this.uId)
            this.userId = this.dataRes.doctorId;
            console.log(this.userId)
            localStorage.setItem('currentuserId', this.userId);
            localStorage.setItem('currentstatus', this.uId);

            localStorage.setItem('currentselectedDoctor', JSON.stringify(res[i+1]));
            return;
          }



        }
        return res;

      })

      );
  }

  onlogout() {
    this.loggedIn.next(false);
    localStorage.clear();
    console.log(localStorage)
    console.log(this.loggedIn)
    console.log("logout sucessfully")
    this.router.navigate(['/Login']);
  }
}
