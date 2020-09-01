import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

   status:any;
   apiUrl:string;
  constructor(private httpClient:HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
  createNewHospital(req){
    return this.httpClient.post(this.apiUrl+'/hospital',req);

  }
  getCity(){
    return this.httpClient.get(this.apiUrl+'/city');
  }  
  addAddress(req){
    return this.httpClient.put(this.apiUrl+'/address',req);
  }


  uploadIdproof(formData,hospitalId){
  var headers = new Headers();
  headers.append('Content-Type', 'multipart/form-data');
  return this.httpClient.put(this.apiUrl+'/hospital/uploadEstProof/'+hospitalId,formData);
   }

   uploadOwnerIdProof(formData,hospitalId){
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
     return this.httpClient.put(this.apiUrl+'/hospital/uploadOwnerFile/'+hospitalId,formData);
   }
   addPassword(req){
    return this.httpClient.put(this.apiUrl+'/changepass',req);
   }
   getAllHospital(page:number):Observable<any>{
     return this.httpClient.get(this.apiUrl+'/hospital/get-all?pageNo='+page+'&pageSize=15&status=ACTIVE');  
   }
   getallPendinghospitals(page:number):Observable<any>{
    return this.httpClient.get(this.apiUrl+'/hospital/registered-by?pageNo='+page+'&pageSize=15&status=PENDING&isRegisteredByAdmin=true');
  }
  getInactivehsopitalList(page:number):Observable<any>{
    return this.httpClient.get(this.apiUrl+'/hospital/get-all?pageNo='+page+'&pageSize=15&status=INACTIVE');
  }
  gethospitalApprovalReequest(page:number):Observable<any>{
    return this.httpClient.get(this.apiUrl+'/hospital/get-all?pageNo='+page+'&pageSize=15&status=UNAPPROVED');
  }
   getHospitalById(userId){
     return this.httpClient.get(this.apiUrl+'/hospital/'+userId);
   }
   updateDoctor(req,userId){
    return this.httpClient.put(this.apiUrl+'/hospital/'+userId,req);
   }
   updateIdProof(formData,userId){
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
     return this.httpClient.put(this.apiUrl+'/hospital/uploadEstProof/'+userId,formData);
   }
   updateOwnerIdproof(formData,userId){
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
     return this.httpClient.put(this.apiUrl+'/hospital/uploadOwnerFile/'+userId,formData);
   }
   updatePassword(req){
    return this.httpClient.put(this.apiUrl+'/changepass',req);
   }
   viewAddress(profileId,userId,req){
  
     return this.httpClient.get(this.apiUrl+'/address'+'/'+userId+'/'+profileId,req);
   }
   downloadOwnerIdproof(userId){
     //return this.httpClient.get(this.apiUrl+'/hospital/downloadOwnerFile/'+userId);

     let url =environment.apiUrl+'/hospital/downloadOwnerFile/'+userId;
     window.open(url,'_blank');
   }
   downloadEstaIdProof(userId){
    let url =environment.apiUrl+'/hospital/downloadEstProof/'+userId;
    window.open(url,'_blank');
   }
   changeStatus(userId,status1,profileId,req){
    return this.httpClient.put(this.apiUrl+'/hospital/profile-status/'+userId+'?status='+status1,req);
   }
   StatusUpdated(userId,status2,profileId,req){
    return this.httpClient.put(this.apiUrl+'/hospital/profile-status/'+userId+'?status='+status2,req);
   }
   getEstIdproof(userId){
     
     return this.httpClient.get(this.apiUrl+'/hospital/downloadEstProof/'+userId);
   }
   changeStatusHospital(userId){
    return this.httpClient.get(this.apiUrl+'/hospital/confirm-registration/'+userId);
   }
   approveRequest(userId,req){
    return this.httpClient.get(this.apiUrl+'/hospital/approve-registration/'+userId,req);
   }
   rejectRequest(userId,req){
    return this.httpClient.get(this.apiUrl+'/hospital/reject-registration/'+userId,req);
   }
   getapprovebyadmin(userId){
    return this.httpClient.get(this.apiUrl+'/hospital/confirm-registration/'+userId);
   }
   gelAllDepartment(hospitalId)
   {
     return this.httpClient.get(this.apiUrl+'/department/hospital/'+hospitalId)
   }
   addDepartment(req)
   {
     return this.httpClient.post(this.apiUrl+'/department',req);
   }
   updateDepartmentName(req)
   {
     return this.httpClient.put(this.apiUrl+'/department',req);
   }
   getAllActiveDoctors(hospitalId){
     return this.httpClient.get(this.apiUrl+'/doctor/doctor-active/'+hospitalId);
   }
   adddepartmentHead(req)
   {
     return this.httpClient.put(this.apiUrl+'/department/head',req);
   }
   addDoctorstoDepartmetn(req)
   {
     return this.httpClient.put(this.apiUrl+'/department/doctors',req);
   }
   getalldesignation()
   {
     return this.httpClient.get(this.apiUrl+'/hospital/designation');
   }
   adduser(req)
   {
     return this.httpClient.post(this.apiUrl+'/hospital/addHospitalUser',req);
   }
   getallusers(id)
   {
     return this.httpClient.get(this.apiUrl+'/hospital/hospitalUser/'+id);
   }
   addIp(req)
   {
     return this.httpClient.post(this.apiUrl+'/hospital/infra',req);
   }
   getIpInfraByHospitalId(id){
     return this.httpClient.get(this.apiUrl+'/hospital/infra/'+id);
   }
   updateIP(req)
   {
    return this.httpClient.put(this.apiUrl+'/hospital/infra',req);
     
   }
   uploadPhoto(formData,ipId)
   {
    return this.httpClient.put(this.apiUrl+'/hospital/infra/image/'+ipId,formData);
   }
}
