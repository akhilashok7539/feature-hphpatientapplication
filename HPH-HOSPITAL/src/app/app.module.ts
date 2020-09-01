import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HospitalComponent } from './hospital/hospital.component';
import { LoadingComponent } from './loading/loading.component';
import { ToastrModule } from 'ngx-toastr';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginService } from './login/login.service';
import { DoctorComponent } from './home/doctor/doctor.component';
import { AddDoctorComponent } from './home/doctor/add-doctor/add-doctor.component';
import { AddAddressComponent } from './home/doctor/add-address/add-address.component';
import { AddQualificationComponent } from './home/doctor/add-qualification/add-qualification.component';
import { AddTimingComponent } from './home/doctor/add-timing/add-timing.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { AddPhotoComponent } from './home/doctor/add-photo/add-photo.component';
import { AddMedicalRegProofComponent } from './home/doctor/add-medical-reg-proof/add-medical-reg-proof.component';
import { AddIdProofComponent } from './home/doctor/add-id-proof/add-id-proof.component';
import { AddSymptomsComponent } from './home/doctor/add-symptoms/add-symptoms.component';
import { DoctorViewComponent } from './home/doctor/doctor-view/doctor-view.component';
import { EditDocBasicDetialsComponent } from './home/doctor/doctor-view/edit-doc-basic-detials/edit-doc-basic-detials.component';
import { EditLocationDetailsComponent } from './home/doctor/doctor-view/edit-location-details/edit-location-details.component';
import { EditQualificationDetailsComponent } from './home/doctor/doctor-view/edit-qualification-details/edit-qualification-details.component';
import { EditDocTimeslotsComponent } from './home/doctor/doctor-view/edit-doc-timeslots/edit-doc-timeslots.component';
import { CommandcenterComponent } from './home/commandcenter/commandcenter.component';
import { AddCommandcenterComponent } from './home/commandcenter/add-commandcenter/add-commandcenter.component';
import { ViewCommandcenterComponent } from './home/commandcenter/view-commandcenter/view-commandcenter.component';
import { EditCommandcenterComponent } from './home/commandcenter/view-commandcenter/edit-commandcenter/edit-commandcenter.component';
import { AppointmentsComponent } from './home/appointments/appointments.component';
import { DoctorLeaveComponent } from './home/doctor-leave/doctor-leave.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';
import { EditSymptomsComponent } from './home/doctor/doctor-view/edit-symptoms/edit-symptoms.component';
import { EditRegistrationProofComponent } from './home/doctor/doctor-view/edit-registration-proof/edit-registration-proof.component';
import { ApprovalRequestComponent } from './home/approval-request/approval-request.component';
import { DoctorService } from './home/doctor/doctor.service';
import { AppointmentService } from './home/appointments/appointment.service';
import { AddDocLeaveComponent } from './home/doctor-leave/add-doc-leave/add-doc-leave.component';
import { CompleteProfileComponent } from './home/doctor/doctor-view/complete-profile/complete-profile.component';
import { EditHospitalLocationDetailsComponent } from './hospital/edit-hospital-location-details/edit-hospital-location-details.component';
import { EditHospitalEstablishmentProofComponent } from './hospital/edit-hospital-establishment-proof/edit-hospital-establishment-proof.component';
import { EditHospitalOwnerIdProofComponent } from './hospital/edit-hospital-owner-id-proof/edit-hospital-owner-id-proof.component';
import { DocTimeingAndAppointmentsComponent } from './home/doctor-leave/doc-timeing-and-appointments/doc-timeing-and-appointments.component';
import { VerificationPageComponent } from './hospital/verification-page/verification-page.component';
import { EditTimeslotsDocComponent } from './home/doctor/doctor-view/edit-doc-timeslots/edit-timeslots-doc/edit-timeslots-doc.component';
import { SymptomsUpdateComponent } from './home/doctor/doctor-view/edit-symptoms/symptoms-update/symptoms-update.component';
import { DepartmentComponent } from './home/department/department.component';
import { AddDepartmentComponent } from './home/department/add-department/add-department.component';
import { DatePipe } from '@angular/common';
import { FilterPipe } from './_helpers/filterpipe';
import { EditDepartmentComponent } from './home/department/edit-department/edit-department.component';
import { AddDepartmentHeadComponent } from './home/department/add-department-head/add-department-head.component';
import { AddDoctortodepartmentComponent } from './home/department/add-doctortodepartment/add-doctortodepartment.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { CancelledAppointmentsComponent } from './home/appointments/cancelled-appointments/cancelled-appointments.component';
import { PendingAppointmentsComponent } from './home/appointments/pending-appointments/pending-appointments.component';
import { DoctorInactiveComponent } from './home/doctor/doctor-inactive/doctor-inactive.component';
import { DoctorPendingComponent } from './home/doctor/doctor-pending/doctor-pending.component';
import { IpinfraComponent } from './home/ipinfra/ipinfra.component';
import { AddIpinfraComponent } from './home/ipinfra/add-ipinfra/add-ipinfra.component';
import { EditInfraComponent } from './home/ipinfra/edit-infra/edit-infra.component';
import { EditHospitallogoComponent } from './hospital/edit-hospitallogo/edit-hospitallogo.component';
import { MappingDepartmentToDoctorComponent } from './home/approval-request/mapping-department-to-doctor/mapping-department-to-doctor.component';
import { AdministratorLoginComponent } from './login/administrator-login/administrator-login.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    ApprovalRequestComponent,
    FooterComponent,
    HomeComponent,
    HospitalComponent,
    LoadingComponent,
    ForgotpasswordComponent,
    DoctorComponent,
    AddDoctorComponent,
    AddAddressComponent,
    AddQualificationComponent,
    AddTimingComponent,
    AddPhotoComponent,
    AddMedicalRegProofComponent,
    AddIdProofComponent,
    AddSymptomsComponent,
    DoctorViewComponent,
    EditDocBasicDetialsComponent,
    EditLocationDetailsComponent,
    EditQualificationDetailsComponent,
    EditDocTimeslotsComponent,
    CommandcenterComponent,
    AddCommandcenterComponent,
    ViewCommandcenterComponent,
    EditCommandcenterComponent,
    AppointmentsComponent,
    DoctorLeaveComponent,
    ProfileComponent,
    ResetPasswordComponent,
    EditSymptomsComponent,
    EditRegistrationProofComponent,
    AddDocLeaveComponent,
    CompleteProfileComponent,
    EditHospitalLocationDetailsComponent,
    EditHospitalEstablishmentProofComponent,
    EditHospitalOwnerIdProofComponent,
    DocTimeingAndAppointmentsComponent,
    VerificationPageComponent,
    EditTimeslotsDocComponent,
    SymptomsUpdateComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    FilterPipe,
    EditDepartmentComponent,
    AddDepartmentHeadComponent,
    AddDoctortodepartmentComponent,
    UserComponent,
    AddUserComponent,
    CancelledAppointmentsComponent,
    PendingAppointmentsComponent,
    DoctorInactiveComponent,
    DoctorPendingComponent,
    IpinfraComponent,
    AddIpinfraComponent,
    EditInfraComponent,
    EditHospitallogoComponent,
    MappingDepartmentToDoctorComponent,
    AdministratorLoginComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AmazingTimePickerModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ToastrModule.forRoot(),
    HttpClientModule,
 
    AppRoutingModule
  ],
  providers: [LoginService,DoctorService,AppointmentService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
