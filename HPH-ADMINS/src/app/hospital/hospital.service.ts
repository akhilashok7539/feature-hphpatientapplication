import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private status: any;
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }
  private refreshneeds$ = new Subject<void>();

  get refresh$() {
    return this.refreshneeds$;
  }
  createNewHospital(req) {
    return this.httpClient.post(this.apiUrl + '/hospital', req);

  }
  getCity() {
    return this.httpClient.get(this.apiUrl + '/city');
  }
  addAddress(req) {
    return this.httpClient.put(this.apiUrl + '/address', req);
  }
  updateSales(req) {
    return this.httpClient.put(this.apiUrl + '/sales', req);
  }

  uploadIdproof(formData, hospitalId) {
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(this.apiUrl + '/hospital/uploadEstProof/' + hospitalId, formData);
  }
  uploadlogo(formData, hospitalId) {
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(this.apiUrl + '/hospital/uploadLogo/' + hospitalId, formData);
  }
  uploadOwnerIdProof(formData, hospitalId) {
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(this.apiUrl + '/hospital/uploadOwnerFile/' + hospitalId, formData);
  }
  addPassword(req) {
    return this.httpClient.put(this.apiUrl + '/changepass', req);
  }
  getAllHospital(page: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/hospital/get-all?pageNo=' + page + '&pageSize=15&status=ACTIVE');
  }
  searchActiveHospital(page: number, values): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/hospital/get-all?pageNo=' + page + '&pageSize=15&status=ACTIVE&filterBy=' + values);
  }
  getallPendinghospitals(page: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/hospital/registered-by?pageNo=' + page + '&pageSize=15&status=PENDING&isRegisteredByAdmin=true');
  }
  searchPendingHospital(page: number, values): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/hospital/registered-by?pageNo=' + page + '&pageSize=15&status=PENDING&isRegisteredByAdmin=true&filterBy=' + values);
  }
  getInactivehsopitalList(page: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/hospital/get-all?pageNo=' + page + '&pageSize=15&status=INACTIVE');
  }
  searchInActiveHospital(page: number, values): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/hospital/get-all?pageNo=' + page + '&pageSize=15&status=INACTIVE&filterBy=' + values);
  }
  gethospitalApprovalReequest(page: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/hospital/get-approval-request?pageNo=' + page + '&pageSize=15')
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
  }
  getHospitalById(userId) {
    return this.httpClient.get(this.apiUrl + '/hospital/' + userId);
  }
  updateDoctor(req, userId) {
    return this.httpClient.put(this.apiUrl + '/hospital/' + userId, req);
  }
  updateIdProof(formData, userId) {
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(this.apiUrl + '/hospital/uploadEstProof/' + userId, formData);
  }
  updateOwnerIdproof(formData, userId) {
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(this.apiUrl + '/hospital/uploadOwnerFile/' + userId, formData);
  }
  updatePassword(req) {
    return this.httpClient.put(this.apiUrl + '/changepass', req);
  }
  viewAddress(profileId, userId, req) {

    return this.httpClient.get(this.apiUrl + '/address' + '/' + userId + '/' + profileId, req);
  }
  downloadOwnerIdproof(userId) {
    //return this.httpClient.get(this.apiUrl+'/hospital/downloadOwnerFile/'+userId);

    let url = environment.apiUrl + '/hospital/downloadOwnerFile/' + userId;
    window.open(url, '_blank');
  }
  downloadEstaIdProof(userId) {
    let url = environment.apiUrl + '/hospital/downloadEstProof/' + userId;
    window.open(url, '_blank');
  }
  changeStatus(userId, status1, profileId, req) {
    return this.httpClient.put(this.apiUrl + '/hospital/profile-status/' + userId + '?status=' + status1, req);
  }
  StatusUpdated(userId, status2, profileId, req) {
    return this.httpClient.put(this.apiUrl + '/hospital/profile-status/' + userId + '?status=' + status2, req);
  }
  getEstIdproof(userId) {

    return this.httpClient.get(this.apiUrl + '/hospital/downloadEstProof/' + userId);
  }
  changeStatusHospital(userId) {
    return this.httpClient.get(this.apiUrl + '/hospital/confirm-registration/' + userId);
  }
  approveRequest(userId, req) {
    return this.httpClient.get(this.apiUrl + '/hospital/approve-registration/' + userId, req)
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
  }
  rejectRequest(userId, req) {
    return this.httpClient.get(this.apiUrl + '/hospital/reject-registration/' + userId, req)
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
  }
  addSales(req) {
    return this.httpClient.post(this.apiUrl + '/sales', req);
  }
  getallHospitalService(pageIndex) {
    return this.httpClient.get(this.apiUrl + '/sales?pageNo=' + pageIndex + '&pageSize=15');
  }
  mappedToSales(hospitalId, salesId, req) {
    return this.httpClient.put(this.apiUrl + '/hospital/map-sales/' + hospitalId + '/' + salesId, req);
  }
  getAlldoctoractive(page: number, hospitalId) {
    return this.httpClient.get(this.apiUrl + '/doctor/hospital/' + hospitalId + '?pageNo=' + page + '&pageSize=15&status=ACTIVE')
  }
  getallhospitalbycity(citySelected) {
    return this.httpClient.get(this.apiUrl + '/hospital/city/' + citySelected);
  }
  getAllDoctors() {
    return this.httpClient.get(this.apiUrl + '/doctor');

  }
  getallHistroy() {
    return this.httpClient.get(this.apiUrl + '/appointments/all/COMPLETED');

  }
  getallappointmentsconfirmed() {
    return this.httpClient.get(this.apiUrl + '/appointments/all/CONFIRMED');

  }
  getconfirmedAppointmentsbyhospital(id,status){
    return this.httpClient.get(this.apiUrl + '/appointments/status/'+id+'?status='+status);

  }
  getconfirmedAppointmentsbyDoctor(id,status)
  {
    return this.httpClient.get(this.apiUrl + '/appointments/doctor/'+id+'?pageNo=0&pageSize=100&status='+status);

  }
  getconfirmedAppointmentsbyDate(status,date)
  {
    return this.httpClient.get(this.apiUrl + '/appointments/date/status?pageNo=0&pageSize=100&status='+status+'&date='+date);

  }
  getappointmetnsbyBookingId(id)
  {
    return this.httpClient.get(this.apiUrl + '/appointments/booking/'+id);

  }
  getallhospitalbycitySelected(page, citySelected) {
    return this.httpClient.get(this.apiUrl + '/hospital/filter?pageNo=' + page + '&pageSize=15&status=ACTIVE&cityId=' + citySelected);

  }
  getallhospitalbycitySelectedInactive(page, citySelected) {
    return this.httpClient.get(this.apiUrl + '/hospital/filter?pageNo=' + page + '&pageSize=15&status=INACTIVE&cityId=' + citySelected);

  }
  getallhospitalbycitySelectedPending(page, citySelected) {
    return this.httpClient.get(this.apiUrl + '/hospital/filter?pageNo=' + page + '&pageSize=15&status=PENDING&cityId=' + citySelected);

  }
  addPercentage(req) {
    return this.httpClient.post(this.apiUrl + '/percentage', req);
  }
  updatePercentage(req) {
    return this.httpClient.put(this.apiUrl + '/percentage', req);
  }
  getpercentageByHospitalId(useid) {
    return this.httpClient.get(this.apiUrl + '/percentage/hospital/' + useid)
  }
  getcount() {
    return this.httpClient.get(this.apiUrl + '/dashboard/admin/count');

  }
  gettop5doc() {
    return this.httpClient.get(this.apiUrl + '/dashboard/admin/doctors');

  }
  gettop5hospitals()
  {
    return this.httpClient.get(this.apiUrl + '/dashboard/admin/hospital');

  }
  gethospitalByRegistration()
  {
    return this.httpClient.get(this.apiUrl + '/dashboard/admin/hospital/registration');

  }
  getTop5speciality(){
    return this.httpClient.get(this.apiUrl + '/dashboard/admin/speciality');

  }
  getallappointmentsbymonth()
  {
    return this.httpClient.get(this.apiUrl + '/dashboard/admin/appointment/month');

  }
  getappoinmentson6years()
  {
    return this.httpClient.get(this.apiUrl + '/dashboard/admin/appointment/year');

  }
  getallpatientdetails()
  {
    return this.httpClient.get(this.apiUrl + '/regpatients');

  }
  getallPendingappointments(){
    return this.httpClient.get(this.apiUrl + '/appointments/all/PENDING');

  }
  // http://localhost:8080/hph/api/hospital/get-all?pageNo=0&pageSize=15&status=ACTIVE
  getallactivehospitallist(){
    return this.httpClient.get(this.apiUrl + '/hospital/get-all?pageNo=0&pageSize=100&status=ACTIVE');

  }
}
