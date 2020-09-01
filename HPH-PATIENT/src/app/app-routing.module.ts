import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookanappointmentComponent } from './home/bookanappointment/bookanappointment.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { HospitalRegistrationComponent } from './hospital-registration/hospital-registration.component';
import { AppointmentsComponent } from './home/appointments/appointments.component';
import { HistoryComponent } from './home/history/history.component';
import { ProfileComponent } from './home/profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';
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


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'bookanappointment', component: BookanappointmentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctor-regsiter', component: DoctorRegistrationComponent },
  { path: 'hospital-register', component: HospitalRegistrationComponent },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'verifyOtp', component: VerifyOtpComponent },
  { path: 'verification', component: SetupPasswordComponent },
  { path: 'loginOTP', component: LoginotpComponent },
  { path: 'otpverification', component: OtpverificationComponent },
  { path: 'HospitalOtpVerification', component: HospitalOtpVerificationComponent },
  { path: 'hospitalMobilenumber', component: HospitalMobilenumberComponent },
  { path: 'hospitalEmailId', component: HospitalEmailIdComponent },
  { path: 'hospitalemailIdverification', component: HospitalEmailIdVerificationComponent },
  { path: 'changeMob', component: EditPhonenumberComponent },
  { path: 'verifyphone', component: EditPhonenumberVerifyComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
