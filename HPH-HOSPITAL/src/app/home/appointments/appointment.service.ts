
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
  getConfirmedAppointment(status,HospitalId,page:number){
    console.log(status)
    return this.http.get(this.apiUrl+'/appointments/status/'+HospitalId+'?status='+status+'&pageNo='+page+'&pageSize=15' );

  }
  getPendingAppointments(status1,HospitalId,page:number){
    return this.http.get(this.apiUrl+'/appointments/status/'+HospitalId+'?status='+status1+'&pageNo='+page+'&pageSize=15' );
  }
  getCanceledAppointments(status2,HospitalId,page:number){
    return this.http.get(this.apiUrl+'/appointments/status/'+HospitalId+'?status='+status2+'&pageNo='+page+'&pageSize=15');
  }
}
