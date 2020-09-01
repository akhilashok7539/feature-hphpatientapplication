import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
   apiUrl:string;
  constructor(private http:HttpClient) {
    this.apiUrl = environment.apiUrl;
   }


   getCurrentAppointments(patientId){
    return this.http.get(this.apiUrl+'/appointments/upcoming/'+patientId);

  }
  getHistory(patientId){
    return this.http.get(this.apiUrl+'/appointments/history/'+patientId);
  }
}
