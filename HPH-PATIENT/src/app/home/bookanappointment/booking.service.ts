import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Subject, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl:string;
  constructor(private http:HttpClient) {
    this.apiUrl = environment.apiUrl;
   }

   private refreshneeds$ = new Subject<void>();
 
   get refresh$(){
   return this.refreshneeds$;
   }
  bookappointment(req){
    return this.http.post(this.apiUrl+'/appointments',req).pipe(
      map(req => req))
  }
  rescheduleappointment(req){
    return this.http.put(this.apiUrl+'/appointments/reschedule',req).pipe(
      tap(() => {
        this.refreshneeds$.next();
      })
    );
  }
  getTimeslots(doctorid):Observable<any>{
    return this.http.get(this.apiUrl+'/availableslot/'+doctorid);
  }
  cancelAppointment(bookingid,req):Observable<any>{
    return this.http.put(this.apiUrl+'/appointments/cancel/'+bookingid,req).pipe(
      tap(() => {
        this.refreshneeds$.next();
      })
    );
      
  }
  bookUnregistedAppointment(req){
    return this.http.post(this.apiUrl+'/appointments',req);
  }
  getallRelationships()
  {
    return this.http.get(this.apiUrl+'/relationship');
  }
}
