import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'appointment',
        loadChildren: '../pages/appointment/appointment.module#AppointmentPageModule'
      },

      // Links to Outside Modules
      {
        path: 'profile',
        loadChildren: '../pages/profile/profile.module#ProfilePageModule'
      },
    ],
  },

  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
