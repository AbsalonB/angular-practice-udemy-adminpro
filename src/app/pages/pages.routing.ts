import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Grafica1Component} from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component'; 
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';

const routes: Routes = [  
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        children:[
          {path:'', component: DashboardComponent, data:{title:'Dashboard'}},
          {path:'progress', component: ProgressComponent, data:{title:'Progress Bar'}},
          {path:"grafica1", component: Grafica1Component, data:{title:'Grafica'}}, 
          {path:"account-settings", component: AccountSettingsComponent, data:{title:'Configuracion'}}, 
          {path:"promesa", component: PromesaComponent, data:{title:'Promesa'}}, 
          {path:"rxjs", component: RxjsComponent, data:{title:'RXJS'}}, 
          {path:"profile", component: ProfileComponent, data:{title:'Profile'}}, 

          //mantenimientos
          {path:"users", component: UsersComponent, data:{title:'Mantenimiento de usuarios'}}, 
          {path:"hospitals", component: HospitalsComponent, data:{title:'Mantenimiento de hospitales'}}, 
          {path:"doctors", component: DoctorsComponent, data:{title:'Mantenimiento de médicos'}}, 
          {path:"doctor/:id", component: DoctorComponent, data:{title:'Mantenimiento de médicos'}},  
        ]
    },
      
    {path:'dashboard', component:DashboardComponent}, 
    {path:'progress', component:ProgressComponent}, 
    {path:'grafica1', component:Grafica1Component}, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
