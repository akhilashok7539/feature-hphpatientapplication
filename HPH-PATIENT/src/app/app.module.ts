import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BannerSectionComponent } from './banner-section/banner-section.component';
import { AboutusSectionComponent } from './aboutus-section/aboutus-section.component';
import { HealthcarSectionComponent } from './healthcar-section/healthcar-section.component';
import { CardSectionComponent } from './card-section/card-section.component';
import { AdvertisementApplicationComponent } from './advertisement-application/advertisement-application.component';
import { FooterComponent } from './footer/footer.component';
import { BookanappointmentComponent } from './home/bookanappointment/bookanappointment.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { HospitalRegistrationComponent } from './hospital-registration/hospital-registration.component';

import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './home/profile/profile.component';
import { BookedanappointmentSectionComponent } from './home/bookanappointment/bookedanappointment-section/bookedanappointment-section.component';
import { AppointmentsComponent } from './home/appointments/appointments.component';
import { HistoryComponent } from './home/history/history.component';
import { DocInfoComponent } from './home/bookanappointment/doc-info/doc-info.component';
import { RescheduleAppointmentComponent } from './home/appointments/reschedule-appointment/reschedule-appointment.component';
import { CancelAppointmentComponent } from './home/appointments/cancel-appointment/cancel-appointment.component';
import { PersonalDetialsComponent } from './home/profile/personal-detials/personal-detials.component';
import { AddressdetailsComponent } from './home/profile/addressdetails/addressdetails.component';
import { PatienthealthrecordsComponent } from './home/profile/patienthealthrecords/patienthealthrecords.component';
import { RelativehelathrecordsComponent } from './home/profile/relativehelathrecords/relativehelathrecords.component';
import { ResetpasswordComponent } from './home/profile/resetpassword/resetpassword.component';
import { AddHealthHistoryComponent } from './home/profile/patienthealthrecords/add-health-history/add-health-history.component';
import { AddRelativeHealthrecordComponent } from './home/profile/relativehelathrecords/add-relative-healthrecord/add-relative-healthrecord.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginService } from './login/login.service';
import { UserService } from './home/profile/user.service';
import { BookingService } from './home/bookanappointment/booking.service';
import { AppointmentService } from './home/appointments/appointment.service';
import { VerifyOtpComponent } from './register/verify-otp/verify-otp.component';
import { SetupPasswordComponent } from './register/setup-password/setup-password.component';
import { LoginotpComponent } from './loginotp/loginotp.component';
import { OtpverificationComponent } from './loginotp/otpverification/otpverification.component';
import { HospitalOtpVerificationComponent } from './hospital-registration/hospital-otp-verification/hospital-otp-verification.component';
import { HospitalMobilenumberComponent } from './hospital-registration/hospital-mobilenumber/hospital-mobilenumber.component';
import { HospitalEmailIdComponent } from './hospital-registration/hospital-email-id/hospital-email-id.component';
import { HospitalEmailIdVerificationComponent } from './hospital-registration/hospital-email-id-verification/hospital-email-id-verification.component';
import { EditPhonenumberComponent } from './home/profile/personal-detials/edit-phonenumber/edit-phonenumber.component';
import { EditPhonenumberVerifyComponent } from './home/profile/personal-detials/edit-phonenumber-verify/edit-phonenumber-verify.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    BannerSectionComponent,
    AboutusSectionComponent,
    HealthcarSectionComponent,
    CardSectionComponent,
    AdvertisementApplicationComponent,
    FooterComponent,
    BookanappointmentComponent,
    LoginComponent,
    RegisterComponent,
    DoctorRegistrationComponent,
    HospitalRegistrationComponent,
    ProfileComponent,
    BookedanappointmentSectionComponent,
    AppointmentsComponent,
    HistoryComponent,
    DocInfoComponent,
    RescheduleAppointmentComponent,
    CancelAppointmentComponent,
    PersonalDetialsComponent,
    AddressdetailsComponent,
    PatienthealthrecordsComponent,
    RelativehelathrecordsComponent,
    ResetpasswordComponent,
    AddHealthHistoryComponent,
    AddRelativeHealthrecordComponent,
    VerifyOtpComponent,
    SetupPasswordComponent,
    LoginotpComponent,
    OtpverificationComponent,
    HospitalOtpVerificationComponent,
    HospitalMobilenumberComponent,
    HospitalEmailIdComponent,
    HospitalEmailIdVerificationComponent,
    EditPhonenumberComponent,
    EditPhonenumberVerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutocompleteLibModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    DemoMaterialModule,
    BrowserAnimationsModule

  ],
  providers: [
    AuthGuard,
    LoginService,
    UserService,
    BookingService,
    AppointmentService,
  ],
  entryComponents: [
    BookedanappointmentSectionComponent,
    DocInfoComponent,
    RescheduleAppointmentComponent,
    CancelAppointmentComponent,
    AddHealthHistoryComponent,
    AddRelativeHealthrecordComponent,
    // HospitalOtpVerificationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
