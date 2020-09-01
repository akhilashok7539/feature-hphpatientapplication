import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HospitalComponent } from './hospital/hospital.component';
import { AddHospitalComponent } from './hospital/add-hospital/add-hospital.component';
import { CommandCenterComponent } from './command-center/command-center.component';
import { AddCcComponent } from './command-center/add-cc/add-cc.component';
import { DepartmentComponent } from './department/department.component';
import { CityComponent } from './city/city.component';
import { AddHospitalAddressComponent } from './hospital/add-hospital-address/add-hospital-address.component';
import { AddHospitalOwnerIdProofComponent } from './hospital/add-hospital-owner-id-proof/add-hospital-owner-id-proof.component';
import { AddHospitalEstIdProofComponent } from './hospital/add-hospital-est-id-proof/add-hospital-est-id-proof.component';
import { AddHospitalPasswordComponent } from './hospital/add-hospital-password/add-hospital-password.component';
import { EditHospitalPasswordComponent } from './hospital/edit-hospital-password/edit-hospital-password.component';
import { EditHospitalComponent } from './hospital/edit-hospital/edit-hospital.component';
import { EditHospitalAddressComponent } from './hospital/edit-hospital-address/edit-hospital-address.component';
import { EditHospitalEstIdProofComponent } from './hospital/edit-hospital-est-id-proof/edit-hospital-est-id-proof.component';
import { EditHospitalOwnerIdProofComponent } from './hospital/edit-hospital-owner-id-proof/edit-hospital-owner-id-proof.component';
import { ViewDetailsComponent } from './hospital/view-details/view-details.component';
import { EditCcComponent } from './command-center/edit-cc/edit-cc.component';
import { ViewCcComponent } from './command-center/view-cc/view-cc.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { AddCityComponent } from './city/add-city/add-city.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentService } from './department/department.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilterPipe } from './hospital/_shared/fliter.pipe';
import { LoginService } from './login/login.service';
import { HospitalService } from './hospital/hospital.service';
import { CommandcenterService } from './command-center/commandcenter.service';
import { EditCcPassComponent } from './command-center/edit-cc/edit-cc-pass/edit-cc-pass.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './_guards/auth.guard';
import { AuthInterceptor } from './_shared/jwtInterceptor';
import { StatusChangeComponent } from './hospital/status-change/status-change.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { InactiveComponent } from './hospital/inactive/inactive.component';
import { PendingComponent } from './hospital/pending/pending.component';
import { ViewHospitalComponent } from './approval-request/view-hospital/view-hospital.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingScreenInterceptor } from './loading/loadinginterceptor';
// import { MatDialogModule, MatNativeDateModule, MatDialogRef, MAT_DIALOG_DATA, MatProgressSpinnerModule } from '@angular/material';
import { SalesComponent } from './sales/sales.component';
import { AddSalesComponent } from './sales/add-sales/add-sales.component';
import { EditSalesComponent } from './sales/edit-sales/edit-sales.component';
import { GetallSalesPersonsComponent } from './approval-request/getall-sales-persons/getall-sales-persons.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DatePipe } from '@angular/common';
import { AppointmentService } from './appointments/appointment.service';
// import {Sort} from '@angular/material/sort';
// import {MatSortModule} from '@angular/material/sort';
import { AlldoctorslistComponent } from './alldoctorslist/alldoctorslist.component';
import { CompletedappointmentsComponent } from './completedappointments/completedappointments.component';
import { HistoryappointmentsComponent } from './historyappointments/historyappointments.component';
// import {MatTabsModule} from '@angular/material/tabs';
import { DemoMaterialModule } from './materialmodule';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddHospitalLogoComponent } from './hospital/add-hospital-logo/add-hospital-logo.component';
import { EditHospitalLogoComponent } from './hospital/edit-hospital-logo/edit-hospital-logo.component';
import { PercentageComponent } from './hospital/percentage/percentage.component';
import { EditPercentageComponent } from './hospital/edit-percentage/edit-percentage.component';
import { DoctorviewFullComponent } from './alldoctorslist/doctorview-full/doctorview-full.component';
import { ViewallCcHospitalComponent } from './hospital/view-details/viewall-cc-hospital/viewall-cc-hospital.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { DashboardCharts1Component } from './dashboard/dashboard-charts1/dashboard-charts1.component';
import { Dashboardchart2Component } from './dashboard/dashboardchart2/dashboardchart2.component';
import { Dashboardchart3Component } from './dashboard/dashboardchart3/dashboardchart3.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PatientsComponent } from './patients/patients.component';
import { AllpendingappointmentsComponent } from './allpendingappointments/allpendingappointments.component';
import { ControlcenterComponent } from './controlcenter/controlcenter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    HeaderComponent,
    LoginComponent,
    SidebarComponent,
    HospitalComponent,
    AddHospitalComponent,
    CommandCenterComponent,
    AddCcComponent,
    DepartmentComponent,
    CityComponent,
    AddHospitalAddressComponent,
    AddHospitalOwnerIdProofComponent,
    AddHospitalEstIdProofComponent,
    AddHospitalPasswordComponent,
    EditHospitalPasswordComponent,
    EditHospitalComponent,
    EditHospitalAddressComponent,
    EditHospitalEstIdProofComponent,
    EditHospitalOwnerIdProofComponent,
    ViewDetailsComponent,
    EditCcComponent,
    ViewCcComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    AddCityComponent,
    FilterPipe,
    EditCcPassComponent,
    StatusChangeComponent,
    ApprovalRequestComponent,
    InactiveComponent,
    PendingComponent,
    ViewHospitalComponent,
    LoadingComponent,
    SalesComponent,
    AddSalesComponent,
    EditSalesComponent,
    GetallSalesPersonsComponent,
    AppointmentsComponent,
    DoctorsComponent,
    AlldoctorslistComponent,
    CompletedappointmentsComponent,
    HistoryappointmentsComponent,
    UserComponent,
    AddUserComponent,
    AddHospitalLogoComponent,
    EditHospitalLogoComponent,
    PercentageComponent,
    EditPercentageComponent,
    DoctorviewFullComponent,
    ViewallCcHospitalComponent,
    DashboardComponent,
    DashboardCharts1Component,
    Dashboardchart2Component,
    Dashboardchart3Component,
    TransactionsComponent,
    PatientsComponent,
    AllpendingappointmentsComponent,
    ControlcenterComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ToastrModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,    
    ToastrModule.forRoot(),
    // MatProgressSpinnerModule ,
    AppRoutingModule,
    ChartsModule
    // MatSortModule,
    // MatTabsModule
  ],
  providers: [
    
    DepartmentService,
    LoginService,
    DatePipe,
    AppointmentService,
    HospitalService,
    CommandcenterService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingScreenInterceptor,multi: true}
  ],
  entryComponents:[
    LoadingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
