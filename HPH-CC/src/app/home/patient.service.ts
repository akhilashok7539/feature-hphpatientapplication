import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private status: any;
  private apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;

  }
  private refreshneeds$ = new Subject<void>();

  get refresh$() {
    return this.refreshneeds$;
  }
  getpatientByDoctor(ccID, page: number, status) {
    // console.log(this.apiUrl)
    return this.httpClient.get(this.apiUrl + '/appointments/cc-appointment-status/' + ccID + '?pageNo=' + page + '&pageSize=15&status=' + status)
    .pipe(
      tap(() => {
        this.refreshneeds$.next();
      })
    );
  }
  getfirstcallconfirm(ccID, page: number, status) {
    return this.httpClient.get(this.apiUrl + '/appointments/cc-appointment-status/' + ccID + '?pageNo=' + page + '&pageSize=15&status=' + status)
    .pipe(
      tap(() => {
        this.refreshneeds$.next();
      })
    );

  }
  getsecondcallConfirm(ccID, page: number, status) {
    return this.httpClient.get(this.apiUrl + '/appointments/cc-appointment-status/' + ccID + '?pageNo=' + page + '&pageSize=15&status=' + status) .pipe(
      tap(() => {
        this.refreshneeds$.next();
      })
    );

  }
  getconfirmedAppoinments(ccID, page: number, status) {
    return this.httpClient.get(this.apiUrl + '/appointments/cc-appointment-status/' + ccID + '?pageNo=' + page + '&pageSize=15&status=' + status)
    .pipe(
      tap(() => {
        this.refreshneeds$.next();
      })
    );

  }
  completedappointmnets(ccID, page: number, status) {
    return this.httpClient.get(this.apiUrl + '/appointments/cc-appointment-status/' + ccID + '?pageNo=' + page + '&pageSize=15&status=' + status);

  }
  getpatientByDoctorsearch(page: number, values) {
    // console.log(this.apiUrl)
    return this.httpClient.get(this.apiUrl + '/appointments/cc-pending-doctor?pageNo=' + page + '&pageSize=15&filterBy=' + values);
  }

  getPatientByHospitalsearch(page: number, values) {
    return this.httpClient.get(this.apiUrl + '/appointments/cc-pending-hospital?pageNo=' + page + '&pageSize=15&filterBy=' + values);

  }
  getPatientByHospital(page: number) {
    return this.httpClient.get(this.apiUrl + '/appointments/cc-pending-hospital?pageNo=' + page + '&pageSize=15');

  }
  getPatientByconfirmed(status, cid, page: number) {
    console.log(page)
    return this.httpClient.get(this.apiUrl + '/appointments/cc-report/' + cid + '?status=' + status + '&pageNo=' + page + '&pageSize=15');
  }

  getPatientByCancelled(status2, ccid, page: number) {
    return this.httpClient.get(this.apiUrl + '/appointments/cc-report/' + ccid + '?status=' + status2 + '&pageNo=' + page + '&pageSize=15');
  }
  getAllLeave() {
    return this.httpClient.get(this.apiUrl + '/leave/get-all');
  }
  getpatientList(userId, date, time) {
    return this.httpClient.get(this.apiUrl + '/appointments/doctor-leave/' + userId + '?date=' + date + '&time=' + time);
  }
  appointmentConfirm(ccId, bookingId, req, status) {
    return this.httpClient.put(this.apiUrl + '/appointments/cc-statusChange/' + bookingId + '/' + ccId + '?status=' + status, req);
  }
  secondcallconfirm(ccId, bookingId, req, status) {
    console.log(status)
    return this.httpClient.put(this.apiUrl + '/appointments/cc-statusChange/' + bookingId + '/' + ccId + '?status=' + status, req);

  }
  cancelAppoinment(ccId, bookingId, req) {
    return this.httpClient.put(this.apiUrl + '/appointments/cc-call/' + bookingId + '/' + ccId, req)
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );

  }
  cancelAppoinmented(ccId, bookingId, req, status2) {

    console.log(status2)
    return this.httpClient.put(this.apiUrl + '/appointments/cc-statusChange/' + bookingId + '/' + ccId + '?status=CANCELLED', req)
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );

  }
  resetPasswordEmail(req) {
    return this.httpClient.post(this.apiUrl + '/reset-mail', req);
  }
  resetPassword(req) {
    return this.httpClient.put(this.apiUrl + '/changepass', req);
  }
  getalltoIP(ccID, page: number, status) {
    return this.httpClient.get(this.apiUrl + '/appointments/cc-appointment-status/' + ccID + '?pageNo=' + page + '&pageSize=15&status=' + status);

  }
  getallsurgery(ccID, page: number, status) {
    return this.httpClient.get(this.apiUrl + '/appointments/cc-appointment-status/' + ccID + '?pageNo=' + page + '&pageSize=15&status=' + status);

  }
  getallFollwUpBooking(ccID, page: number, status) {
    return this.httpClient.get(this.apiUrl + '/appointments/cc-appointment-status/' + ccID + '?pageNo=' + page + '&pageSize=15&status=' + status);

  }
  getTimeslots(doctorId) {
    return this.httpClient.get(this.apiUrl + '/availableslot/' + doctorId);
  }
  addFollow(req) {
    return this.httpClient.post(this.apiUrl + '/appointments/followup',req);

  }
  getAllIpInfra(hospital)
  {
    return this.httpClient.get(this.apiUrl + '/hospital/infra/'+hospital);

  }
  addIPinfraRoom(req)
  {
    return this.httpClient.post(this.apiUrl + '/appointments/ip-infra',req);

  }
  searchcancelappointment(keyword)
  {
    return this.httpClient.get(this.apiUrl + '/appointments/booking/'+keyword);
    
  }
}
