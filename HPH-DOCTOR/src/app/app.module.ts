import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DoctorRegistrationComponent } from './home/doctor-registration/doctor-registration.component';
import { DoctorComponent } from './home/doctor/doctor.component';
import { AppointmentsComponent } from './home/doctor/appointments/appointments.component';
import { HistoryComponent } from './home/doctor/history/history.component';
import { ProfileComponent } from './home/doctor/profile/profile.component';
import { PersonaldetailsComponent } from './home/doctor/profile/personaldetails/personaldetails.component';
import { HospitaldetailsComponent } from './home/doctor/profile/hospitaldetails/hospitaldetails.component';
import { LocationdetailsComponent } from './home/doctor/profile/locationdetails/locationdetails.component';
import { QualificationdetailsComponent } from './home/doctor/profile/qualificationdetails/qualificationdetails.component';
import { TimeslotsComponent } from './home/doctor/profile/timeslots/timeslots.component';
import { SymptomsComponent } from './home/doctor/profile/symptoms/symptoms.component';
import { ProfilepictureComponent } from './home/doctor/profile/profilepicture/profilepicture.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DemoMaterialModule } from './material';
import { DatePipe } from '@angular/common';
import { DoctorService } from './home/doctor/doctor.service';
import { UpdateTimeslotsComponent } from './home/doctor/profile/timeslots/update-timeslots/update-timeslots.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { EditDocSymptomsComponent } from './home/doctor/profile/symptoms/edit-doc-symptoms/edit-doc-symptoms.component';
import { UpdateDocAddressComponent } from './home/doctor-registration/update-doc-address/update-doc-address.component';
import { UpdateQualifcationDetailsComponent } from './home/doctor-registration/update-qualifcation-details/update-qualifcation-details.component';
import { UpdateDocTimeslotsComponent } from './home/doctor-registration/update-doc-timeslots/update-doc-timeslots.component';
import { UpdateDocProfilepicComponent } from './home/doctor-registration/update-doc-profilepic/update-doc-profilepic.component';
import { UpdateMedicalRegistationProofComponent } from './home/doctor-registration/update-medical-registation-proof/update-medical-registation-proof.component';
import { UpdateIdProofComponent } from './home/doctor-registration/update-id-proof/update-id-proof.component';
import { UpdateSymptomsComponent } from './home/doctor-registration/update-symptoms/update-symptoms.component';
import { CompleteProfileViewComponent } from './home/doctor-registration/complete-profile-view/complete-profile-view.component';
import { DoctorLeaveComponent } from './home/doctor/doctor-leave/doctor-leave.component';
import { AddLeaveComponent } from './home/doctor/doctor-leave/add-leave/add-leave.component';
import { LeaveRequestComponent } from './home/doctor/leave-request/leave-request.component';
import { DocTimingAppoitmentsComponent } from './home/doctor/leave-request/doc-timing-appoitments/doc-timing-appoitments.component';
import { DocHospitalComponent } from './home/doc-hospital/doc-hospital.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    ForgotpasswordComponent,
    HomeComponent,
    ResetPasswordComponent,
    DoctorRegistrationComponent,
    DoctorComponent,
    AppointmentsComponent,
    HistoryComponent,
    ProfileComponent,
    PersonaldetailsComponent,
    HospitaldetailsComponent,
    LocationdetailsComponent,
    QualificationdetailsComponent,
    TimeslotsComponent,
    SymptomsComponent,
    ProfilepictureComponent,
    UpdateTimeslotsComponent,
    EditDocSymptomsComponent,
    UpdateDocAddressComponent,
    UpdateQualifcationDetailsComponent,
    UpdateDocTimeslotsComponent,
    UpdateDocProfilepicComponent,
    UpdateMedicalRegistationProofComponent,
    UpdateIdProofComponent,
    UpdateSymptomsComponent,
    CompleteProfileViewComponent,
    DoctorLeaveComponent,
    AddLeaveComponent,
    LeaveRequestComponent,
    DocTimingAppoitmentsComponent,
    DocHospitalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DemoMaterialModule,
    ToastrModule.forRoot(),
    FormsModule,
    AmazingTimePickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe,DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
