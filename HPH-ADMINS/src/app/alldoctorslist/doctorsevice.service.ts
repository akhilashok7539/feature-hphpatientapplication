import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DoctorseviceService {

  private apiUrl:string;
  constructor(private httpClient:HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
  getdocById(userId){
    return this.httpClient.get(this.apiUrl+'/doctor/'+userId);
  }
  downloadMedicalProof(userId){
    let url =environment.apiUrl+'/proof/downloadMedical/'+userId;
    window.open(url,'_blank');
   }
   downloadIdproofDoctor(userId){
    let url =environment.apiUrl+'/proof/downloadId/'+userId;
    window.open(url,'_blank');
   }
}
