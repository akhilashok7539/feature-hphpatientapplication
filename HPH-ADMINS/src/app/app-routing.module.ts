import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HospitalComponent } from './hospital/hospital.component';
import { AddHospitalComponent } from './hospital/add-hospital/add-hospital.component';
import { CommandCenterComponent } from './command-center/command-center.component';
import { AddCcComponent } from './command-center/add-cc/add-cc.component';
import { DepartmentComponent } from './department/department.component';
import { CityComponent } from './city/city.component';
import { AddHospitalAddressComponent } from './hospital/add-hospital-address/add-hospital-address.component';
import { AddHospitalEstIdProofComponent } from './hospital/add-hospital-est-id-proof/add-hospital-est-id-proof.component';
import { AddHospitalOwnerIdProofComponent } from './hospital/add-hospital-owner-id-proof/add-hospital-owner-id-proof.component';
import { AddHospitalPasswordComponent } from './hospital/add-hospital-password/add-hospital-password.component';
import { EditHospitalComponent } from './hospital/edit-hospital/edit-hospital.component';
import { EditHospitalAddressComponent } from './hospital/edit-hospital-address/edit-hospital-address.component';
import { EditHospitalEstIdProofComponent } from './hospital/edit-hospital-est-id-proof/edit-hospital-est-id-proof.component';
import { EditHospitalOwnerIdProofComponent } from './hospital/edit-hospital-owner-id-proof/edit-hospital-owner-id-proof.component';
import { EditHospitalPasswordComponent } from './hospital/edit-hospital-password/edit-hospital-password.component';
import { ViewDetailsComponent } from './hospital/view-details/view-details.component';
import { EditCcComponent } from './command-center/edit-cc/edit-cc.component';
import { ViewCcComponent } from './command-center/view-cc/view-cc.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { AddCityComponent } from './city/add-city/add-city.component';
import { EditCcPassComponent } from './command-center/edit-cc/edit-cc-pass/edit-cc-pass.component';
import { AuthGuard } from './_guards/auth.guard';
import { StatusChangeComponent } from './hospital/status-change/status-change.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { PendingComponent } from './hospital/pending/pending.component';
import { InactiveComponent } from './hospital/inactive/inactive.component';
import { ViewHospitalComponent } from './approval-request/view-hospital/view-hospital.component';
import { SalesComponent } from './sales/sales.component';
import { AddSalesComponent } from './sales/add-sales/add-sales.component';
import { EditSalesComponent } from './sales/edit-sales/edit-sales.component';
import { GetallSalesPersonsComponent } from './approval-request/getall-sales-persons/getall-sales-persons.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { AlldoctorslistComponent } from './alldoctorslist/alldoctorslist.component';
import { CompletedappointmentsComponent } from './completedappointments/completedappointments.component';
import { HistoryappointmentsComponent } from './historyappointments/historyappointments.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddHospitalLogoComponent } from './hospital/add-hospital-logo/add-hospital-logo.component';
import { EditHospitalLogoComponent } from './hospital/edit-hospital-logo/edit-hospital-logo.component';
import { PercentageComponent } from './hospital/percentage/percentage.component';
import { EditPercentageComponent } from './hospital/edit-percentage/edit-percentage.component';
import { DoctorviewFullComponent } from './alldoctorslist/doctorview-full/doctorview-full.component';
import { ViewallCcHospitalComponent } from './hospital/view-details/viewall-cc-hospital/viewall-cc-hospital.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PatientsComponent } from './patients/patients.component';
import { AllpendingappointmentsComponent } from './allpendingappointments/allpendingappointments.component';
import { ControlcenterComponent } from './controlcenter/controlcenter.component';

const routes: Routes = [
  {path:'', redirectTo: '/Login', pathMatch: 'full' },
  {path:'Login', component: LoginComponent },
  {path:'Home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'Hospital',component:HospitalComponent,canActivate:[AuthGuard]},
  {path:'sales',component:SalesComponent,canActivate:[AuthGuard]},
  {path:'edit-sales',component:EditSalesComponent,canActivate:[AuthGuard]},
  {path:'getallsalesPerson',component:GetallSalesPersonsComponent,canActivate:[AuthGuard]},
  {path:'Controlcenter',component:ControlcenterComponent,canActivate:[AuthGuard]},

  {path:'add-sales',component:AddSalesComponent,canActivate:[AuthGuard]},
  {path:'AddHospital',component:AddHospitalComponent,canActivate:[AuthGuard]},
  {path:'addHospitalAddress',component:AddHospitalAddressComponent,canActivate:[AuthGuard]},
  {path:'add-estId',component:AddHospitalEstIdProofComponent,canActivate:[AuthGuard]},
  {path:'ownerIdProof',component:AddHospitalOwnerIdProofComponent,canActivate:[AuthGuard]},
  {path:'password',component:AddHospitalPasswordComponent,canActivate:[AuthGuard]},
  {path:'CC',component:CommandCenterComponent,canActivate:[AuthGuard]},
  {path:'viewallcc/:id',component:ViewallCcHospitalComponent,canActivate:[AuthGuard]},

  {path:'addcc',component:AddCcComponent,canActivate:[AuthGuard]},
  {path:'department',component:DepartmentComponent,canActivate:[AuthGuard]},
  {path:'city',component:CityComponent,canActivate:[AuthGuard]},
  {path:'edithospital',component:EditHospitalComponent,canActivate:[AuthGuard]},
  {path:'editAddress',component:EditHospitalAddressComponent,canActivate:[AuthGuard]},
  {path:'edit-estid',component:EditHospitalEstIdProofComponent,canActivate:[AuthGuard]},
  {path:'edit-owner-id',component:EditHospitalOwnerIdProofComponent,canActivate:[AuthGuard]},
  {path:'editpassword',component:EditHospitalPasswordComponent,canActivate:[AuthGuard]},
  {path:'view',component:ViewDetailsComponent,canActivate:[AuthGuard]},
  {path:'edit-cc',component:EditCcComponent,canActivate:[AuthGuard]},
  {path:'view-cc',component:ViewCcComponent,canActivate:[AuthGuard]},
  {path:'add-department',component:AddDepartmentComponent,canActivate:[AuthGuard]},
  {path:'addcity',component:AddCityComponent,canActivate:[AuthGuard]},
  {path:'edit-ccPass',component:EditCcPassComponent,canActivate:[AuthGuard]},
  {path:'statusChange',component:StatusChangeComponent},
  {path:'approvalRequest',component:ApprovalRequestComponent,canActivate:[AuthGuard]},
  {path:'hospital/pending',component:PendingComponent,canActivate:[AuthGuard]},
  {path:'hospital/In-active',component:InactiveComponent,canActivate:[AuthGuard]},
  {path:'viewHospital',component:ViewHospitalComponent,canActivate:[AuthGuard]},
  {path:'appointments/:id',component:AppointmentsComponent,canActivate:[AuthGuard]},
  {path:'getalldoctors',component:DoctorsComponent,canActivate:[AuthGuard]},
  {path:'alldoctors',component:AlldoctorslistComponent,canActivate:[AuthGuard]},
  {path:'completedappointments',component:CompletedappointmentsComponent,canActivate:[AuthGuard]},
  {path:'historyofappointments',component:HistoryappointmentsComponent,canActivate:[AuthGuard]},
  {path:'user',component:UserComponent,canActivate:[AuthGuard]},
  {path:'add-user',component:AddUserComponent,canActivate:[AuthGuard]},
  {path:'add-hospitallogo',component:AddHospitalLogoComponent,canActivate:[AuthGuard]},
  {path:'edit-logo',component:EditHospitalLogoComponent,canActivate:[AuthGuard]},
  {path:'percentage',component:PercentageComponent,canActivate:[AuthGuard]},
  {path:'edit-percentage/:id',component:EditPercentageComponent,canActivate:[AuthGuard]},
  {path:'viewDoctor/:id',component:DoctorviewFullComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'transaction',component:TransactionsComponent,canActivate:[AuthGuard]},
  {path:'patients',component:PatientsComponent,canActivate:[AuthGuard]},
  {path:'pendingappointments',component:AllpendingappointmentsComponent,canActivate:[AuthGuard]},

  // 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
