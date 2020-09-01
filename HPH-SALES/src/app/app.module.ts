import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HospitalRequestVerifyComponent } from './hospital-request-verify/hospital-request-verify.component';
import { AddHospitalComponent } from './home/add-hospital/add-hospital.component';
import { AddHospitalAddressComponent } from './home/add-hospital-address/add-hospital-address.component';
import { AddHospitalEstIdProofComponent } from './home/add-hospital-est-id-proof/add-hospital-est-id-proof.component';
import { AddHospitalOwnerIdProofComponent } from './home/add-hospital-owner-id-proof/add-hospital-owner-id-proof.component';
import { VerifyHospitalComponent } from './hospital-request-verify/verify-hospital/verify-hospital.component';
import { StatusChangeComponent } from './home/status-change/status-change.component';
import { ViewComponent } from './home/view/view.component';
import { MaterialModule } from './material';
import { ToastrModule } from 'ngx-toastr';
import { DoctorComponent } from './home/doctor/doctor.component';
import { AddDoctorComponent } from './home/doctor/add-doctor/add-doctor.component';
import { AddAddressComponent } from './home/doctor/add-address/add-address.component';
import { AddDoctorQualificationComponent } from './home/doctor/add-doctor-qualification/add-doctor-qualification.component';
import { AddDoctorIdProofComponent } from './home/doctor/add-doctor-id-proof/add-doctor-id-proof.component';
import { AddDoctorMedicalRegProofComponent } from './home/doctor/add-doctor-medical-reg-proof/add-doctor-medical-reg-proof.component';
import { AddDoctorProfilepicComponent } from './home/doctor/add-doctor-profilepic/add-doctor-profilepic.component';
import { AddDoctorTimeslotsComponent } from './home/doctor/add-doctor-timeslots/add-doctor-timeslots.component';
import { AddDoctorSymptomsComponent } from './home/doctor/add-doctor-symptoms/add-doctor-symptoms.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { PendingDoctorsListComponent } from './home/pending-doctors-list/pending-doctors-list.component';
import { DoctorViewComponent } from './home/doctor-view/doctor-view.component';
import { FilterPipe } from './filter.pipe'; 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    HospitalRequestVerifyComponent,
    AddHospitalComponent,
    AddHospitalAddressComponent,
    AddHospitalEstIdProofComponent,
    AddHospitalOwnerIdProofComponent,
    VerifyHospitalComponent,
    StatusChangeComponent,
    ViewComponent,
    DoctorComponent,
    AddDoctorComponent,
    AddAddressComponent,
    AddDoctorQualificationComponent,
    AddDoctorIdProofComponent,
    AddDoctorMedicalRegProofComponent,
    AddDoctorProfilepicComponent,
    AddDoctorTimeslotsComponent,
    AddDoctorSymptomsComponent,
    PendingDoctorsListComponent,
    DoctorViewComponent,
    FilterPipe,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    AmazingTimePickerModule, 

    BrowserAnimationsModule,
    ReactiveFormsModule,    
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
