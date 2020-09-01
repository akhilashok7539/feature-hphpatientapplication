import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }
  getCity() {
    return this.httpClient.get(this.apiUrl + '/city');
  }
  addHospital(req) {
    return this.httpClient.post(this.apiUrl + '/hospital', req);
  }
  addAddress(req) {
    return this.httpClient.put(this.apiUrl + '/address', req);
  }
  uploadIdproof(formData, hospitalId) {
    return this.httpClient.put(this.apiUrl + '/hospital/uploadEstProof/' + hospitalId, formData);
  }
  uploadOwnerIdProof(formData, hospitalId) {
    return this.httpClient.put(this.apiUrl + '/hospital/uploadOwnerFile/' + hospitalId, formData);
  }
  changeStatusHospital(userId){
    return this.httpClient.get(this.apiUrl+'/hospital/confirm-registration/'+userId);
   }
   getAllMappedHospitalsllist(id,page)
   {
     return this.httpClient.get(this.apiUrl+'/sales/get-hospital/'+id+'?pageNo='+page+'&pageSize=15&status=ACTIVE');
   }
   getHospistalById(id)
   {
     return this.httpClient.get(this.apiUrl+'/hospital/'+id);
   }
   downloadOwnerIdproof(userId){

    let url =environment.apiUrl+'/hospital/downloadOwnerFile/'+userId;
    window.open(url,'_blank');
  }
  downloadEstaIdProof(userId){
   let url =environment.apiUrl+'/hospital/downloadEstProof/'+userId;
   window.open(url,'_blank');
  }
  getAllhospitalMappedtosales(page,id)
  {
    return this.httpClient.get(this.apiUrl+'/sales/get-hospital/'+id+'?pageNo='+page+'&pageSize=15&status=MAPPED_TO_SALES');
  }
  getallapprovedStatus(page,id)
  {
    return this.httpClient.get(this.apiUrl+'/sales/get-hospital/'+id+'?pageNo='+page+'&pageSize=15&status=SALES_APPROVED');
  }
  getallRejectStatus(page,id)
  {
    return this.httpClient.get(this.apiUrl+'/sales/get-hospital/'+id+'?pageNo='+page+'&pageSize=15&status=SALES_REJECTED');
  }
  approveMappedDate(id,req)
  {
    return this.httpClient.put(this.apiUrl + '/sales/approve/'+id,req)
  }
  rejectmappedData(id,req)
  {
    return this.httpClient.put(this.apiUrl + '/sales/reject/'+id,req)
  }
  getAlldoctorsAddedbysales(id,page)
  {
    return this.httpClient.get(this.apiUrl+'/sales/get-doctor/'+id+'?pageNo='+page+'&pageSize=15&status=ACTIVE');
  }
  getAlldoctorsAddedbysalesPending(id,page)
  {
    return this.httpClient.get(this.apiUrl+'/sales/get-doctor/'+id+'?pageNo='+page+'&pageSize=15&status=PENDING');
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
