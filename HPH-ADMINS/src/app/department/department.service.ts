import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private status:any;
  apiUrl:string;
  constructor(private httpClient:HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
  createDepart(req){
    console.log(this.apiUrl)

    return this.httpClient.post(this.apiUrl+'/spec',req);
  }

  getDepartments(){
    return this.httpClient.get(this.apiUrl+'/spec');
  }
 
  createCity(req){
    return this.httpClient.post(this.apiUrl+'/city',req);
  }
  getCity(){
    return this.httpClient.get(this.apiUrl+'/city');
  }
  deleteDepatment(userId){
    return this.httpClient.delete(this.apiUrl+'/spec/'+userId);
  }
  deleteCity(cityUid){
    return this.httpClient.delete(this.apiUrl+'/city/'+cityUid);
  }
  gethospitalall(id)
  {
    return this.httpClient.get(this.apiUrl + '/hospital/city/' + id);

  }
  Specilaity(page, citySelected, selectid)
  {
    return this.httpClient.get(this.apiUrl + '/doctor/searchBySpec/' + citySelected + '/' + selectid + '?pageNo=' + page+'&pageSize=35');

  }
  gethospital(page,citySelected,selectid)
  {
    return this.httpClient.get(this.apiUrl + '/doctor/searchByHospital/' + citySelected + '/' + selectid + '?pageNo=' + page+'&pageSize=35');

  }
}
