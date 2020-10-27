import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessListComponent } from './ClientAccounts/components/BusinessList.component';
import { NewBusinessComponent } from './ClientAccounts/components/NewBusiness.component';
const routes: Routes = [
    { path: 'client-accounts', component: BusinessListComponent },
    { path: 'new-client-account', component: NewBusinessComponent },
    { path: '',   redirectTo: '/client-accounts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
