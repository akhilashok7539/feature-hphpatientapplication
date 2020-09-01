import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './home/doctor/history/history.component';
import { ProfileComponent } from './home/doctor/profile/profile.component';
import { UpdateTimeslotsComponent } from './home/doctor/profile/timeslots/update-timeslots/update-timeslots.component';
import { EditDocSymptomsComponent } from './home/doctor/profile/symptoms/edit-doc-symptoms/edit-doc-symptoms.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DoctorRegistrationComponent } from './home/doctor-registration/doctor-registration.component';
import { CompleteProfileViewComponent } from './home/doctor-registration/complete-profile-view/complete-profile-view.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { DoctorLeaveComponent } from './home/doctor/doctor-leave/doctor-leave.component';
import { AddLeaveComponent } from './home/doctor/doctor-leave/add-leave/add-leave.component';
import { LeaveRequestComponent } from './home/doctor/leave-request/leave-request.component';
import { DocTimingAppoitmentsComponent } from './home/doctor/leave-request/doc-timing-appoitments/doc-timing-appoitments.component';
import { DocHospitalComponent } from './home/doc-hospital/doc-hospital.component';


const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'updatetimeslots', component: UpdateTimeslotsComponent },
  { path: 'updateSymptoms', component: EditDocSymptomsComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'doctorBasicDetails', component: DoctorRegistrationComponent },
  { path: 'view', component: CompleteProfileViewComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'doctor-leave', component: DoctorLeaveComponent },
  { path: 'add-leave', component: AddLeaveComponent },
  { path: 'leaveRequest', component: LeaveRequestComponent },
  { path: 'doctiming-appointments', component: DocTimingAppoitmentsComponent },
  { path: 'hospitalselect', component: DocHospitalComponent },








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
