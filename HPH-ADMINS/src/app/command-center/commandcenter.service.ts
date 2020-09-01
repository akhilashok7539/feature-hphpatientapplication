import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandcenterService {

  private status:any;
  private apiUrl:string;
  constructor(private httpClient:HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  createNewService(req){
    return this.httpClient.post(this.apiUrl+'/register',req);

  }
  getallCommonCC(){
    return this.httpClient.get(this.apiUrl+'/cc/central');

  }
  getAllCC(page:number):Observable<any>{
    return this.httpClient.get(this.apiUrl+'/cc?pageNo='+page+'&pageSize=15');
  }

  getccbyId(userId){
    return this.httpClient.get(this.apiUrl+'/cc/'+userId);
  }
  updateCC(req,userId){
    return this.httpClient.put(this.apiUrl+'/cc/update/'+userId,req);
  }
  getCommandById(userId){
    return this.httpClient.get(this.apiUrl+'/cc/'+userId);
  }
  updatePassoword(req){
    return this.httpClient.put(this.apiUrl+'/changepass',req);
  }
  changeStatus(userId,status1,profileId,req){
    return this.httpClient.put(this.apiUrl+'/profile-status/'+userId+'/'+profileId+'?status='+status1,req);
  }
  changeActiveStatus(userId,status2,profileId,req){
    return this.httpClient.put(this.apiUrl+'/profile-status/'+userId+'/'+profileId+'?status='+status2,req);
    
  }
  disablecc(id,req)
  {
    return this.httpClient.put(this.apiUrl+'/cc/central-disable/'+id,req);

  }
  enablecc(id,req)
  {
    return this.httpClient.put(this.apiUrl+'/cc/central-enable/'+id,req);

  }
}
