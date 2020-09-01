import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }
  getCategory(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/category");
  }
  getCity(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/city");
  }
  getAllSickness():Observable<any>{
    return this.httpClient.get(this.apiUrl+'/sickness');
  }
  getDoctors(searchresults): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/doctor/city/' + searchresults);
  }
  getDocSpecilaity(searchresults): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/doctor/spec/' + searchresults);
  }
  getTimeslots(doctorId): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/availableslot/' + doctorId);
  }
  getAppointments(patientId): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/appointments/' + patientId);
  }
  getSpeciality(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/spec');
  }
  Specilaity(page: number, citySelected, selectid): Observable<any> {
    console.log(page)
    return this.httpClient.get(this.apiUrl + '/doctor/searchBySpec/' + citySelected + '/' + selectid + '?pageNo=' + page+'&pageSize=25');
  }
  gethospital(page: number, citySelected, selectid): Observable<any> {
    console.log(page)
    return this.httpClient.get(this.apiUrl + '/doctor/searchByHospital/' + citySelected + '/' + selectid + '?pageNo=' + page+'&pageSize=25');
  }
  getAllDocBYcityandSickness(page: number, citySelected, selectid): Observable<any> 
  {
    return this.httpClient.get(this.apiUrl + '/doctor/searchBySickness/' + citySelected + '/' + selectid + '?pageNo=' + page+'& pageSize=25');

  }
  gethospitalall(citySelected) {
    return this.httpClient.get(this.apiUrl + '/hospital/city/' + citySelected);
  }


  
}
