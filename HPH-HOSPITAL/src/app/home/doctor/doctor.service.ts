import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private status:any;
  private apiUrl:string;
  constructor(private httpClient:HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
  private refreshneeds$ = new Subject<void>();
 
  get refresh$(){
  return this.refreshneeds$;
  }
  createDoc(req){
    return this.httpClient.post(this.apiUrl+'/doctor',req);

  }
  getAllSymptomsBydcId(userid){
    return this.httpClient.get(this.apiUrl+'/doctor/getSickness/'+userid)
  }
  getSpeciality():Observable<any>{
      return this.httpClient.get(this.apiUrl+'/spec');
  }
  getCity():Observable<any>{
    return this.httpClient.get(this.apiUrl+'/city');
  }
  addAddress(req){
    return this.httpClient.put(this.apiUrl+'/address',req);
  }

  getdoctors(HospitalId):Observable<any>{
    return this.httpClient.get(this.apiUrl+'/doctor/hospital/'+HospitalId);
  }
  getdoctorsByactive(HospitalId):Observable<any>{
    return this.httpClient.get(this.apiUrl+'/doctor/doctor-active/'+HospitalId);
  }
  // getEmployeebyId(doctorId){
  //   return this.httpClient.get(this.apiUrl+'/doctors'+doctorId);
  // }
  // getEmployeebyId(doctorId){
  //   return this.httpClient.get(this.apiUrl+'/doctors')
  // }
  changeStatus(userId,status1,req){
    return this.httpClient.put(this.apiUrl+'/doctor/doctor-status/'+userId+'?status='+status1,req)
    .pipe(
      tap(() => {
        this.refreshneeds$.next();
      })
    );
  }
  changeInactiveStatus(userId,status2,req){
    return this.httpClient.put(this.apiUrl+'/doctor/doctor-status/'+userId+'?status='+status2,req) 
    .pipe(
      tap(() => {
        this.refreshneeds$.next();
      })
    );
  }
  getdocById(userId){
    return this.httpClient.get(this.apiUrl+'/doctor/'+userId);
  }
  getDocDegreeById(userId){
    return this.httpClient.get(this.apiUrl+'/doctordegree/'+userId);
  }
  updateDoc(req){
    return this.httpClient.put(this.apiUrl+'/doctor',req);

  }
  addTiming(req){
    return this.httpClient.post(this.apiUrl+'/timing',req);
  }
  updateDoctorIdProof(formData,userId){
    console.log(formData)
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    // let url =environment.apiUrl.baseUrl+environment.apiUrl.employeeDetailsApi+'profilePic';
    return this.httpClient.put(this.apiUrl+'/proof/uploadId/'+userId,formData);
     
  }
  updateMedicalRegistrationProof(formData,userId){
    console.log(formData)

    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put(this.apiUrl+'/proof/uploadMedical/'+userId,formData);
  }
  doctorIdProofUpload(formData,doctorId){
    console.log(formData)
    var headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    // let url =environment.apiUrl.baseUrl+environment.apiUrl.employeeDetailsApi+'profilePic';
    return this.httpClient.put(this.apiUrl+'/proof/uploadId/'+doctorId,formData);
     }


     uploadPhoto(formData,doctorId){
      var headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
       return this.httpClient.put(this.apiUrl+'/doctor/uploadImage/'+doctorId,formData);
     }
     updatePhoto(formData,userId){
      var headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
       return this.httpClient.put(this.apiUrl+'/doctor/uploadImage/'+userId,formData);
     }

     getDegree(){
       return this.httpClient.get(this.apiUrl+'/degree');
     }
     getcollege(){
       return this.httpClient.get(this.apiUrl+'/college');
     }
     getCouncil(){
       return this.httpClient.get(this.apiUrl+'/council');
     }

     addQualification(req){
       return this.httpClient.put(this.apiUrl+'/doctordegree',req);
     }
     updateQualification(req){
      return this.httpClient.put(this.apiUrl+'/doctordegree',req);
     }
     uploadMedicalRegProof(formData,doctorId){
       return this.httpClient.put(this.apiUrl+'/proof/uploadMedical/'+doctorId,formData);
     }

     ViewProfileAddress(profileId,userId,req){
      return this.httpClient.get(this.apiUrl+'/address'+'/'+userId+'/'+profileId,req);

     }
     getDocAddressById(profileId,userId,req){
      return this.httpClient.get(this.apiUrl+'/address'+'/'+userId+'/'+profileId,req);

     }
     updateDoctorAddress(req){
      return this.httpClient.put(this.apiUrl+'/address',req);
     }
     updatetiming(req){
      return this.httpClient.post(this.apiUrl+'/timing',req);
     }
     downloadMedicalProof(userId){
      let url =environment.apiUrl+'/proof/downloadMedical/'+userId;
      window.open(url,'_blank');
     }
     downloadIdproofDoctor(userId){
      let url =environment.apiUrl+'/proof/downloadId/'+userId;
      window.open(url,'_blank');
     }
     getdocIdproof(userId){
      return this.httpClient.get(this.apiUrl+'/proof/downloadId/'+userId);

     }
     resetPasswordEmail(req){
      return this.httpClient.post(this.apiUrl+'/reset-mail',req);
     }
     getAlldoctoractive(page:number,hospitalId):Observable<any>{
      return this.httpClient.get(this.apiUrl+'/doctor/hospital/'+hospitalId+'?pageNo='+page+'&pageSize=15&status=ACTIVE')
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
     }
     searchActiveDoctors(page:number,hospitalId,values):Observable<any>{
      return this.httpClient.get(this.apiUrl+'/doctor/hospital/'+hospitalId+'?pageNo='+page+'&pageSize=15&status=ACTIVE&filterBy='+values)
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
     }
     getallPendingdoctor(page:number,hospitalId):Observable<any>{
      return this.httpClient.get(this.apiUrl+'/doctor/hospital/'+hospitalId+'?pageNo='+page+'&pageSize=15&status=PENDING')
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
     }
     searchPendingDoctors(page:number,hospitalId,values):Observable<any>{
      return this.httpClient.get(this.apiUrl+'/doctor/hospital/'+hospitalId+'?pageNo='+page+'&pageSize=15&status=PENDING&filterBy='+values)
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
     }
     getInactiveDoctor(page:number,hospitalId):Observable<any>{
      return this.httpClient.get(this.apiUrl+'/doctor/hospital/'+hospitalId+'?pageNo='+page+'&pageSize=15&status=INACTIVE')
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
     }
     searchInactiveDoctors(page:number,hospitalId,values):Observable<any>{
      return this.httpClient.get(this.apiUrl+'/doctor/hospital/'+hospitalId+'?pageNo='+page+'&pageSize=15&status=INACTIVE&filterBy='+values)
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
     }
     gethospitalApprovalReequest(page:number,userId):Observable<any>{
      return this.httpClient.get(this.apiUrl+'/doctor/hospital/'+userId+'?pageNo='+page+'&pageSize=15&status=UNAPPROVED');
     }
     approveRequest(userId,req){
      return this.httpClient.get(this.apiUrl+'/doctor/approve-registration/'+userId,req)
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
     }
     rejectRequest(userId,req){
      return this.httpClient.get(this.apiUrl+'/doctor/reject-registration/'+userId,req)
      .pipe(
        tap(() => {
          this.refreshneeds$.next();
        })
      );
     }
     getalltimeslotsfordoctor(userId){
       return this.httpClient.get(this.apiUrl+"/timing/"+userId);
     }
     changeStatusHospital(doctorId){
      return this.httpClient.get(this.apiUrl+'/doctor/confirm-registration/'+doctorId);
     }
     getAllSymptoms(){
       return this.httpClient.get(this.apiUrl+'/sickness');
     }
     addSymptoms(req)
     {
       return this.httpClient.post(this.apiUrl+'/doctor/addSickness',req);
     }
     resetPassword(req)
     {
      return this.httpClient.put(this.apiUrl+'/changepass',req);
     }
     getAllsessions(userid) {
      return this.httpClient.get(this.apiUrl + '/timing/sessions/' + userid)
    }
    addLeaveDoctor(req){
      return this.httpClient.post(this.apiUrl + '/leave', req);
    }
    getLeaveByDate(dateSelected,HospitalId){
      return this.httpClient.get(this.apiUrl+'/leave/'+HospitalId+'?date='+dateSelected);
    } 
    getallAvalibaletimslots(userId)
    {
      return this.httpClient.get(this.apiUrl + '/availableslot/' + userId);
    }
    getallappointments(date,id)
    {
      return this.httpClient.get(this.apiUrl + '/appointments/date/' + id + '?pageNo=0&pageSize=150&date=' + date);

    }
    approveleaveRequest(leaveid,req)
    {
      return this.httpClient.put(this.apiUrl+'/leave/approve-leave/'+leaveid,req);
    }
    rejectleaveRequest(leaveid,req){
      return this.httpClient.put(this.apiUrl+'/leave/reject-leave/'+leaveid,req);
  
    }
}

  