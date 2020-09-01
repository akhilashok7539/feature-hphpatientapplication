import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
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
  doctorIdProofUpload(formData, doctorId) {
    console.log(formData)
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    // let url =environment.apiUrl.baseUrl+environment.apiUrl.employeeDetailsApi+'profilePic';
    return this.httpClient.put(this.apiUrl + '/proof/uploadId/' + doctorId, formData);
  }
  uploadMedicalRegProof(formData, doctorId) {
    return this.httpClient.put(this.apiUrl + '/proof/uploadMedical/' + doctorId, formData);
  }

  uploadPhoto(formData, doctorId) {
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(this.apiUrl + '/doctor/uploadImage/' + doctorId, formData);
  }
  addTiming(req) {
    return this.httpClient.post(this.apiUrl + '/timing', req);
  }

  getAllSymptoms() {
    return this.httpClient.get(this.apiUrl + '/sickness');
  }
  addSymptoms(req) {
    return this.httpClient.post(this.apiUrl + '/doctor/addSickness', req);
  }
  changeStatusHospital(doctorId) {
    return this.httpClient.get(this.apiUrl + '/doctor/confirm-registration/' + doctorId);

  }
  getSpeciality(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/spec');
  }
  getCity(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/city');
  }
  getallhospitalbycity(citySelected) {
    return this.httpClient.get(this.apiUrl + '/hospital/city/' + citySelected);
  }
  createDoc(req){
    return this.httpClient.post(this.apiUrl+'/doctor',req);
  }
  addAddress(req)
  {
    return this.httpClient.put(this.apiUrl+'/address',req);

  }
  addQualification(req)
  {
    return this.httpClient.put(this.apiUrl+'/doctordegree',req);
  }
}
