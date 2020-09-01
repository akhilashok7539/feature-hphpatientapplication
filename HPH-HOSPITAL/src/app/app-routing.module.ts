import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './home/doctor/doctor.component';
import { AddDoctorComponent } from './home/doctor/add-doctor/add-doctor.component';
import { DoctorViewComponent } from './home/doctor/doctor-view/doctor-view.component';
import { CommandcenterComponent } from './home/commandcenter/commandcenter.component';
import { AddCommandcenterComponent } from './home/commandcenter/add-commandcenter/add-commandcenter.component';
import { ViewCommandcenterComponent } from './home/commandcenter/view-commandcenter/view-commandcenter.component';
import { AppointmentsComponent } from './home/appointments/appointments.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ApprovalRequestComponent } from './home/approval-request/approval-request.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';
import { DoctorLeaveComponent } from './home/doctor-leave/doctor-leave.component';
import { AddDocLeaveComponent } from './home/doctor-leave/add-doc-leave/add-doc-leave.component';
import { HospitalComponent } from './hospital/hospital.component';
import { DocTimeingAndAppointmentsComponent } from './home/doctor-leave/doc-timeing-and-appointments/doc-timeing-and-appointments.component';
import { VerificationPageComponent } from './hospital/verification-page/verification-page.component';
import { EditTimeslotsDocComponent } from './home/doctor/doctor-view/edit-doc-timeslots/edit-timeslots-doc/edit-timeslots-doc.component';
import { SymptomsUpdateComponent } from './home/doctor/doctor-view/edit-symptoms/symptoms-update/symptoms-update.component';
import { DepartmentComponent } from './home/department/department.component';
import { AddDepartmentComponent } from './home/department/add-department/add-department.component';
import { EditDepartmentComponent } from './home/department/edit-department/edit-department.component';
import { AddDepartmentHeadComponent } from './home/department/add-department-head/add-department-head.component';
import { AddDoctortodepartmentComponent } from './home/department/add-doctortodepartment/add-doctortodepartment.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { IpinfraComponent } from './home/ipinfra/ipinfra.component';
import { AddIpinfraComponent } from './home/ipinfra/add-ipinfra/add-ipinfra.component';
import { EditInfraComponent } from './home/ipinfra/edit-infra/edit-infra.component';
import { AuthGuard } from './_guard/auth.guard';
import { MappingDepartmentToDoctorComponent } from './home/approval-request/mapping-department-to-doctor/mapping-department-to-doctor.component';
import { AdministratorLoginComponent } from './login/administrator-login/administrator-login.component';


const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'hospital-administrator', component: AdministratorLoginComponent },

  { path: 'Home', component: HomeComponent ,canActivate:[AuthGuard]},
  { path: 'hospital', component: HospitalComponent ,canActivate:[AuthGuard]},
  { path: 'verification', component: VerificationPageComponent ,canActivate:[AuthGuard]},
  { path: 'updatetimeslots', component: EditTimeslotsDocComponent,canActivate:[AuthGuard] },
  { path: 'symptomsupdate', component: SymptomsUpdateComponent,canActivate:[AuthGuard] },
  { path: 'Doctor', component: DoctorComponent ,canActivate:[AuthGuard]},
  { path: 'addDoctor', component: AddDoctorComponent ,canActivate:[AuthGuard]},
  { path: 'doctor-view', component: DoctorViewComponent ,canActivate:[AuthGuard]},
  { path: 'commandcenter', component: CommandcenterComponent ,canActivate:[AuthGuard]},
  { path: 'addcc', component: AddCommandcenterComponent ,canActivate:[AuthGuard]},
  { path: 'view-commandcenter', component: ViewCommandcenterComponent,canActivate:[AuthGuard] },
  { path: 'appointments', component: AppointmentsComponent,canActivate:[AuthGuard] },
  { path: 'profile', component: ProfileComponent ,canActivate:[AuthGuard]},
  { path: 'approval-request', component: ApprovalRequestComponent,canActivate:[AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'doctorLeave', component: DoctorLeaveComponent,canActivate:[AuthGuard] },
  { path: 'add-leave', component: AddDocLeaveComponent ,canActivate:[AuthGuard]},
  { path: 'doc-timming-appoitnmetns', component: DocTimeingAndAppointmentsComponent },
  { path: 'department', component: DepartmentComponent ,canActivate:[AuthGuard] },
  { path: 'add-department', component: AddDepartmentComponent,canActivate:[AuthGuard] },
  { path: 'edit-department', component: EditDepartmentComponent ,canActivate:[AuthGuard]},
  { path: 'add-department-head', component: AddDepartmentHeadComponent ,canActivate:[AuthGuard]},
  { path: 'add-department-doctor', component: AddDoctortodepartmentComponent ,canActivate:[AuthGuard]},
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'user', component: UserComponent ,canActivate:[AuthGuard]},
  { path: 'add-user', component: AddUserComponent ,canActivate:[AuthGuard]},
  { path: 'ipinfra', component: IpinfraComponent,canActivate:[AuthGuard] },
  { path: 'add-ipinfra', component: AddIpinfraComponent ,canActivate:[AuthGuard]},
  { path: 'edit-infra', component: EditInfraComponent ,canActivate:[AuthGuard]},
  { path: 'approve-and-mapdepartment/:id', component: MappingDepartmentToDoctorComponent ,canActivate:[AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
