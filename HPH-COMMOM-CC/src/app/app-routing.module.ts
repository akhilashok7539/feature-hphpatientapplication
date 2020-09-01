import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PatientListComponent } from './home/patient-list/patient-list.component';
import { EditPatientComponent } from './home/edit-patient/edit-patient.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ViewDocPatientsComponent } from './notifications/view-doc-patients/view-doc-patients.component';
import { ReportsComponent } from './reports/reports.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordComponent } from './password/password.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { CanceledComponent } from './reports/canceled/canceled.component';
import { AuthGuard } from './_guards/auth.guard';
import { OnprogressComponent } from './home/onprogress/onprogress.component';
import { FollowupappointmnetdateComponent } from './home/onprogress/followupappointmnetdate/followupappointmnetdate.component';
import { ChooseIpInfraComponent } from './home/onprogress/choose-ip-infra/choose-ip-infra.component';
import { ApprovalrequestComponent } from './home/approvalrequest/approvalrequest.component';
import { ViewComponent } from './home/approvalrequest/view/view.component';

const routes: Routes = [
  { path:'', redirectTo: '/Login', pathMatch: 'full' },
  { path:'Login', component: LoginComponent },
  {path:'Home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'patient-list',component:PatientListComponent,canActivate:[AuthGuard]},
  {path:'edit-patient',component:EditPatientComponent,canActivate:[AuthGuard]},
  {path:'notifications',component:NotificationsComponent,canActivate:[AuthGuard]},
  {path:'view-doc-patients',component:ViewDocPatientsComponent,canActivate:[AuthGuard]},
  {path:'reports',component:ReportsComponent,canActivate:[AuthGuard]},
  {path:'resetPassword',component:ResetPasswordComponent,canActivate:[AuthGuard]},
  {path:'password',component:PasswordComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'onprogress',component:OnprogressComponent,canActivate:[AuthGuard]},
  {path:'followupappointment/:followup/:doctor',component:FollowupappointmnetdateComponent,canActivate:[AuthGuard]},
  {path:'chooseIpInfra/:id/:hospitalId',component:ChooseIpInfraComponent,canActivate:[AuthGuard]},
  {path:'cancelcomponent',component:CanceledComponent,canActivate:[AuthGuard]},
  {path:'approvalrequest',component:ApprovalrequestComponent,canActivate:[AuthGuard]},
  {path:'doctorview',component:ViewComponent,canActivate:[AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
