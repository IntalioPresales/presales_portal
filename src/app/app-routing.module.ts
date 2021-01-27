import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigatecmComponent } from './navigatecm/navigatecm.component';
import { NavigationWonComponent } from './navigation-won/navigation-won.component';
import { FormsComponent } from './forms/forms.component';
import { NavigatePresalesComponent } from './navigate-presales/navigate-presales.component';
import { NavigationPageComponent } from './navigation-page/navigation-page.component';
import { AllDataViewComponent } from './all-data-view/all-data-view.component';
import {PendingDataViewComponent} from './pending-data-view/pending-data-view.component';
import { ViewOpportunityComponent } from './view-opportunity/view-opportunity.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', component: LoginPageComponent },
    {
      path: 'main', component: FormsComponent,canActivate: [AuthGuard]
    },
    {
      path: 'viewopportunity', component: ViewOpportunityComponent,canActivate: [AuthGuard]
    },
    {
      path: 'viewsubmitteddata', component: AllDataViewComponent,canActivate: [AuthGuard]
    },
    {
      path: 'navigatecm', component: NavigatecmComponent,canActivate: [AuthGuard]
    },
    {
      path: 'viewwondata', component: NavigationWonComponent,canActivate: [AuthGuard]
    },
    {
      path: 'viewactivedata', component: PendingDataViewComponent,canActivate: [AuthGuard]
    },
    {
      path: 'navigate', component: NavigationPageComponent,canActivate: [AuthGuard]
    },
    {
      path: 'navigatepresales', component: NavigatePresalesComponent,canActivate: [AuthGuard]
    },
    {
      path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,enableTracing:false,onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
