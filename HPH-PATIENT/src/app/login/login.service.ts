import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private status: any;
  private apiUrl: string;
  constructor(private http: HttpClient,
    private router: Router) {
    this.apiUrl = environment.apiUrl;
  }


  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  // ,{'headers' : new HttpHeaders ({'Content-Type' : 'application/json'}), 'responseType': 'text', observe:'response'}
  login(req): Observable<HttpResponse<Object>> {

    return this.http.post<HttpResponse<Object>>(this.apiUrl + '/login', req, { observe: 'response'})
      .pipe
      (map ((response) => {
        console.log(response)
        // const data = response.data;
        const keys = response.headers.keys();
        console.log(keys)
        const headers = keys.map((key) => response.headers.get(key)); 
        console.log(headers)
        const JWTtoken = response.headers.get('JWT-TOKEN');
        console.log(JWTtoken)

        if (response) {
          this.loggedIn.next(true);
        }
        return response;
      })
      );

 
  }
  
  logout() {

    this.loggedIn.next(false);
    localStorage.removeItem('currentPatient');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/Login']);
    console.log(this.loggedIn)
    console.log("logout sucessfully")
  }

  sendOtp(mobNo) {
    // return this.http.post(this.apiUrl+'/access'+'/sendLoginOTP',req);
    return this.http.post(this.apiUrl + '/sendRegisterOTP', mobNo);

  }

  verifyOtp(req) {
    // console.log(req.otp)
    // console.log(req["otp"])
    // return  this.http.get(this.apiUrl+'/access'+'/verifyOTP?otp='+req.otp)
    return this.http.get(this.apiUrl + '/verifyOTP?otp=' + req.otp)
      .pipe(
        map(res => {
          if (res) {
            this.loggedIn.next(true);
          }
        })
      );
  }

  verifyToLogin(mobNo) {
    return this.http.get(this.apiUrl + '/regpatients/mob?mobNo=' + mobNo);

  }


  numberChanged(req, patientId) {
    return this.http.put(this.apiUrl + '/regpatients/changemob/' + patientId, req);
  }



  sendOtpLogin(mobNo) {
    return this.http.post(this.apiUrl + '/sendLoginOTP', mobNo);
  }
  sendOTP(mobNo) {
    // return this.http.post(this.apiUrl+'/access'+'/sendLoginOTP',req);
    return this.http.post(this.apiUrl + '/sendRegisterOTP', mobNo);

  }
}
