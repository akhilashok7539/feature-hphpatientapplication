import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map, filter, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;

  }
  private refreshneeds$ = new Subject<void>();

  get refresh$() {
    return this.refreshneeds$;
  }
  public create(req) {
    return this.httpClient.post(this.apiUrl + '/register', req).pipe(
      map(req => req))
  }
  public updateUser(patientId, req) {
    return this.httpClient.put(this.apiUrl + '/regpatients/' + patientId, req).pipe(
      map(res => res))
  }
  public updateUserAddress(req) {
    return this.httpClient.put(this.apiUrl + '/address', req).pipe(
      map(res => res))
    //     {
    //     if(res){

    //       localStorage.setItem('currentPatientAddress',JSON.stringify(res));
    //      console.log(localStorage)
    //   }
    //   return res;
    // })

    // );
  }
  public viewprofile(patientId) {
    return this.httpClient.get(this.apiUrl + '/regpatients/' + patientId).pipe(
      map(res => res))
  }
  public viewAddress(patientId, userId, req) {
    return this.httpClient.get(this.apiUrl + '/address' + '/' + patientId + '/' + userId, req).pipe(
      map(res => res))
  }
  public registerOtp(mobNo) {
    return this.httpClient.post(this.apiUrl + '/sendRegisterOTP', mobNo);
  }
  verifyOtp(req) {
    console.log(req)
    return this.httpClient.get(this.apiUrl + '/verifyOTP?otp=' + req.otp);
  }
  addAddress(req) {
    return this.httpClient.post(this.apiUrl + '/address', req).pipe(
      map(res => res))
  }
  resetPassword(req) {
    return this.httpClient.put(this.apiUrl + '/changepass', req);
  }
  getHospitals() {
    return this.httpClient.get(this.apiUrl + '/hospital/get-all?pageNo=0&pageSize=15&status=ACTIVE');
  }
  addHospital(req) {
    return this.httpClient.post(this.apiUrl + '/hospital', req);
  }
  uploadhealthhistory(formData, patientId) {
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.post(this.apiUrl + '/health-record/' + patientId, formData);
  }
  addHealthHistoryDetails(req) {
    return this.httpClient.put(this.apiUrl + '/health-record/data', req)
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
  }
  getPatientHealthHistory(patientId) {
    return this.httpClient.get(this.apiUrl + '/health-record/patient/' + patientId);
  }
  getRelativeHealthHistory(patientId) {
    return this.httpClient.get(this.apiUrl + '/health-record/relative/' + patientId);

  }
  deletehealthhistory(healthId): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/health-record/' + healthId);
  }
  downloadHealthHistory(healthId) {
    let url = environment.apiUrl + '/health-record/download/' + healthId;
    window.open(url, '_blank');
  }
  addDoctor(req) {
    return this.httpClient.post(this.apiUrl + '/doctor', req);
  }
  sendOtp(req) {
    return this.httpClient.post(this.apiUrl + '/sendHospitalOTP', req);
  }
  verifyOTP(req) {
    return this.httpClient.get(this.apiUrl + '/verifyOTP?otp=' + req.otp);
  }
  verifyEmail(req) {
    return this.httpClient.post(this.apiUrl + '/sendEmailOTP', req);
  }
  veriyemailOTP(req) {
    return this.httpClient.get(this.apiUrl + '/verifyOTP?otp=' + req.otp);
  }
  createNewHospital(req) {
    return this.httpClient.post(this.apiUrl + '/hospital', req);
  }
  getallrelatives(patientId) {
    return this.httpClient.get(this.apiUrl + '/unregpatients/patientId/' + patientId);
  }
  getUnregPatientDetailsById(id) {
    return this.httpClient.get(this.apiUrl+'/unregpatients/'+id);
  }
}
