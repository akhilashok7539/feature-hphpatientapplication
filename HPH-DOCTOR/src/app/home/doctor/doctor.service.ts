import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  private status: any;
  private apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  createDoc(req) {
    return this.httpClient.post(this.apiUrl + '/doctor', req);

  }
  getSpeciality(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/spec');
  }
  getCity(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/city');
  }
  addAddress(req) {
    return this.httpClient.put(this.apiUrl + '/address', req);
  }
  getdoctors(HospitalId): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/doctor/hospital/' + HospitalId);
  }
  getdoctorsByactive(HospitalId): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/doctor/doctor-active/' + HospitalId);
  }
  // getEmployeebyId(doctorId){
  //   return this.httpClient.get(this.apiUrl+'/doctors'+doctorId);
  // }
  // getEmployeebyId(doctorId){
  //   return this.httpClient.get(this.apiUrl+'/doctors')
  // }
  changeStatus(userId, status1, req) {
    return this.httpClient.put(this.apiUrl + '/doctor/doctor-status/' + userId + '?status=' + status1, req);
  }
  changeInactiveStatus(userId, status2, req) {
    return this.httpClient.put(this.apiUrl + '/doctor/doctor-status/' + userId + '?status=' + status2, req);
  }
  getdocById(userId) {
    return this.httpClient.get(this.apiUrl + '/doctor/' + userId);
  }
  getDocDegreeById(userId) {
    return this.httpClient.get(this.apiUrl + '/doctordegree/' + userId);
  }
  updateDoc(req) {
    return this.httpClient.put(this.apiUrl + '/doctor', req);

  }
  addTiming(req) {
    return this.httpClient.post(this.apiUrl + '/timing', req);
  }
  updateDoctorIdProof(formData, userId) {
    console.log(formData)
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    // let url =environment.apiUrl.baseUrl+environment.apiUrl.employeeDetailsApi+'profilePic';
    return this.httpClient.put(this.apiUrl + '/proof/uploadId/' + userId, formData);

  }
  updateMedicalRegistrationProof(formData, userId) {
    console.log(formData)

    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(this.apiUrl + '/proof/uploadMedical/' + userId, formData);
  }
  doctorIdProofUpload(formData, doctorId) {
    console.log(formData)
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    // let url =environment.apiUrl.baseUrl+environment.apiUrl.employeeDetailsApi+'profilePic';
    return this.httpClient.put(this.apiUrl + '/proof/uploadId/' + doctorId, formData);
  }


  uploadPhoto(formData, doctorId) {
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(this.apiUrl + '/doctor/uploadImage/' + doctorId, formData);
  }
  updatePhoto(formData, userId) {
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(this.apiUrl + '/doctor/uploadImage/' + userId, formData);
  }

  getDegree() {
    return this.httpClient.get(this.apiUrl + '/degree');
  }
  getcollege() {
    return this.httpClient.get(this.apiUrl + '/college');
  }
  getCouncil() {
    return this.httpClient.get(this.apiUrl + '/council');
  }

  addQualification(req) {
    return this.httpClient.post(this.apiUrl + '/doctordegree', req);
  }
  updateQualification(req) {
    return this.httpClient.put(this.apiUrl + '/doctordegree', req);
  }
  uploadMedicalRegProof(formData, doctorId) {
    return this.httpClient.put(this.apiUrl + '/proof/uploadMedical/' + doctorId, formData);
  }

  ViewProfileAddress(profileId, userId, req) {
    return this.httpClient.get(this.apiUrl + '/address' + '/' + userId + '/' + profileId, req);

  }
  getDocAddressById(profileId, userId, req) {
    return this.httpClient.get(this.apiUrl + '/address' + '/' + userId + '/' + profileId, req);

  }
  updateDoctorAddress(req) {
    return this.httpClient.put(this.apiUrl + '/address', req);
  }
  updatetiming(req) {
    return this.httpClient.post(this.apiUrl + '/timing', req);
  }
  downloadMedicalProof(userId) {
    let url = environment.apiUrl + '/proof/downloadMedical/' + userId;
    window.open(url, '_blank');
  }
  downloadIdproofDoctor(userId) {
    let url = environment.apiUrl + '/proof/downloadId/' + userId;
    window.open(url, '_blank');
  }
  getdocIdproof(userId) {
    return this.httpClient.get(this.apiUrl + '/proof/downloadId/' + userId);

  }
  resetPasswordEmail(req) {
    return this.httpClient.post(this.apiUrl + '/reset-mail', req);
  }
  //  getapprovebyadmin(userId){
  //   return this.httpClient.get(this.apiUrl+'/doctor/confirm-registration/'+userId);
  //  }
  getappointments(page: number, data, userId): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/appointments/date/' + userId + '?pageNo=' + page + '&pageSize=15&date=' + data);
  }
  getappointmentsHistory(page: number, data, userId): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/appointments/history-doctor/' + userId + '?pageNo=' + page + '&pageSize=15&date=' + data);
  }
  getAllSymptomsBydcId(userid) {
    return this.httpClient.get(this.apiUrl + '/doctor/getSickness/' + userid)
  }
  getalltimeslotsfordoctor(userId) {
    return this.httpClient.get(this.apiUrl + "/timing/" + userId);
  }
  getAllSymptoms() {
    return this.httpClient.get(this.apiUrl + '/sickness');
  }
  addSymptoms(req) {
    return this.httpClient.post(this.apiUrl + '/doctor/addSickness', req);
  }
  resetPassword(req) {
    return this.httpClient.put(this.apiUrl + '/changepass', req);
  }
  getapprovebyadmin(userId) {
    return this.httpClient.get(this.apiUrl + '/doctor/confirm-registration/' + userId);
  }
  getapproveHopsitals(req)
  {
    return this.httpClient.put(this.apiUrl + '/doctor/confirm-registration-multiple/' ,req);

  }
  gethospitalall(citySelected) {
    return this.httpClient.get(this.apiUrl + '/hospital/city/' + citySelected);
  }
  getAllsessions(userid) {
    return this.httpClient.get(this.apiUrl + '/timing/sessions/' + userid)
  }
  addNewLeave(req) {
    return this.httpClient.post(this.apiUrl + '/leave', req);
  }
  getallLeaveBydocId(id) {
    return this.httpClient.get(this.apiUrl+'/leave/doctor/'+id);
  }
  getAllLeaveRequestByDepartment(id)
  {
    return this.httpClient.get(this.apiUrl+'/leave/by-status-department/'+id+'/UNAPPROVED');
  }
  getallAvalibaletimslots(id)
  {
    return this.httpClient.get(this.apiUrl + '/availableslot/' + id);

  }
  getallappointments(date,id)
  {
    return this.httpClient.get(this.apiUrl + '/appointments/date/' + id + '?pageNo=0&pageSize=150&date=' + date);

  }
  approveleaveRequest(leaveid,req)
  {
    return this.httpClient.put(this.apiUrl+'/leave/approve-leave-head/'+leaveid,req);
  }
  rejectleaveRequest(leaveid,req){
    return this.httpClient.put(this.apiUrl+'/leave/reject-leave-head/'+leaveid,req);

  }
}
