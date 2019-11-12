import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
/* import { AuthGuardService } from 'src/app/service/auth/auth-guard.service'; */

const routes: Routes = [
  { path: '', 
  component: DashboardComponent, 
  children: dashboardRoutes, 
  /* canActivate: [ AuthGuardService ]  */
},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
