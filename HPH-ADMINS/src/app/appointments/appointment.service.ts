import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {



  private status: any;
  private apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }
  getappointments(page: number, data, userId): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/appointments/date/' + userId + '?pageNo=' + page + '&pageSize=15&date=' + data);
  }
  getappointmentsbyid(id)
  {
    return this.httpClient.get(this.apiUrl+'appointments/status/'+id+'?status=CONFIRMED&pageNo=0&pageSize=15');
  }
}
