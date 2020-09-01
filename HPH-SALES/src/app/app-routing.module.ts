import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HospitalRequestVerifyComponent } from './hospital-request-verify/hospital-request-verify.component';
import { AddHospitalComponent } from './home/add-hospital/add-hospital.component';
import { VerifyHospitalComponent } from './hospital-request-verify/verify-hospital/verify-hospital.component';
import { AddHospitalAddressComponent } from './home/add-hospital-address/add-hospital-address.component';
import { AddHospitalEstIdProofComponent } from './home/add-hospital-est-id-proof/add-hospital-est-id-proof.component';
import { AddHospitalOwnerIdProofComponent } from './home/add-hospital-owner-id-proof/add-hospital-owner-id-proof.component';
import { StatusChangeComponent } from './home/status-change/status-change.component';
import { ViewComponent } from './home/view/view.component';
import { AddDoctorComponent } from './home/doctor/add-doctor/add-doctor.component';
import { AddAddressComponent } from './home/doctor/add-address/add-address.component';
import { AddDoctorQualificationComponent } from './home/doctor/add-doctor-qualification/add-doctor-qualification.component';
import { AddDoctorTimeslotsComponent } from './home/doctor/add-doctor-timeslots/add-doctor-timeslots.component';
import { AddDoctorIdProofComponent } from './home/doctor/add-doctor-id-proof/add-doctor-id-proof.component';
import { AddDoctorMedicalRegProofComponent } from './home/doctor/add-doctor-medical-reg-proof/add-doctor-medical-reg-proof.component';
import { AddDoctorProfilepicComponent } from './home/doctor/add-doctor-profilepic/add-doctor-profilepic.component';
import { AddDoctorSymptomsComponent } from './home/doctor/add-doctor-symptoms/add-doctor-symptoms.component';
import { PendingDoctorsListComponent } from './home/pending-doctors-list/pending-doctors-list.component';
import { DoctorViewComponent } from './home/doctor-view/doctor-view.component';


const routes: Routes = [
  {path:'', redirectTo: '/Login', pathMatch: 'full' },
  {path:'Login', component: LoginComponent },
  {path:'Home', component: HomeComponent },
  {path:'hospital-request-verify', component: HospitalRequestVerifyComponent },
  {path:'add-hospital', component: AddHospitalComponent },
  {path:'verify-hospital', component: VerifyHospitalComponent },
  {path:'view-hospital', component: ViewComponent },

  {path:'addHospitalAddress',component:AddHospitalAddressComponent},
  {path:'add-estId',component:AddHospitalEstIdProofComponent},
  {path:'ownerIdProof',component:AddHospitalOwnerIdProofComponent},
  {path:'statusChange',component:StatusChangeComponent},
  {path:'Doctors',component:AddDoctorComponent},
  {path:'add-address',component:AddAddressComponent},
  {path:'add-qualification',component:AddDoctorQualificationComponent},
  {path:'add-timeslots',component:AddDoctorTimeslotsComponent},
  {path:'add-idproof',component:AddDoctorIdProofComponent},
  {path:'add-medicalregproof',component:AddDoctorMedicalRegProofComponent},
  {path:'add-photo',component:AddDoctorProfilepicComponent},
  {path:'add-symptoms',component:AddDoctorSymptomsComponent},
  {path:'pendingDoclist',component:PendingDoctorsListComponent},
  {path:'doctorview/:id',component:DoctorViewComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
