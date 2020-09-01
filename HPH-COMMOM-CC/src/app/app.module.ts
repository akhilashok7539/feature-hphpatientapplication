import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
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
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmComponent } from './home/confirm/confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CanceledComponent } from './reports/canceled/canceled.component';
import { PatientService } from './home/patient.service';
import { LoginService } from './login/login.service';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthGuard } from './_guards/auth.guard';
import { ToastrModule } from 'ngx-toastr';
// import { FilterPipe } from './_pipes/filterpipe';
import { PendingAppointmentsComponent } from './home/patient-list/pending-appointments/pending-appointments.component';
import { FirstCallConfirmedAppointmentsComponent } from './home/patient-list/first-call-confirmed-appointments/first-call-confirmed-appointments.component';
import { SecondCallConfirmedAppointmentsComponent } from './home/patient-list/second-call-confirmed-appointments/second-call-confirmed-appointments.component';
import { ConfirmedAppointmentsComponent } from './home/patient-list/confirmed-appointments/confirmed-appointments.component';
import { CompletedAppointmentsComponent } from './home/patient-list/completed-appointments/completed-appointments.component';
import { DemoMaterialModule } from './material';
import { FilterPipe } from './_model/filter.pipe';
import { FilterPipes } from './_pipes/filterpipe';
import { OnprogressComponent } from './home/onprogress/onprogress.component';
import { FollowupappointmnetdateComponent } from './home/onprogress/followupappointmnetdate/followupappointmnetdate.component';
import { ChooseIpInfraComponent } from './home/onprogress/choose-ip-infra/choose-ip-infra.component';
import { ApprovalrequestComponent } from './home/approvalrequest/approvalrequest.component';
import { ViewComponent } from './home/approvalrequest/view/view.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    PatientListComponent,
    EditPatientComponent,
    NotificationsComponent,
    ViewDocPatientsComponent,
    ReportsComponent,
    ResetPasswordComponent,
    PasswordComponent,
    ForgotPasswordComponent,
    ConfirmComponent,
    CanceledComponent,
    FilterPipe,
    FilterPipes,
    PendingAppointmentsComponent,
    FirstCallConfirmedAppointmentsComponent,
    SecondCallConfirmedAppointmentsComponent,
    ConfirmedAppointmentsComponent,
    CompletedAppointmentsComponent,
    OnprogressComponent,
    FollowupappointmnetdateComponent,
    ChooseIpInfraComponent,
    ApprovalrequestComponent,
    ViewComponent,
    
   
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatTabsModule,
    AppRoutingModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
       
     
      }
     ),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  entryComponents:[ConfirmComponent],
  providers: [
    PatientService,AuthGuard,
    LoginService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
