import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/search-customer', // Default route
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'edit-customer/:id',
    component: EditCustomerComponent
  },
  {
    path: 'search-customer',
    component: SearchCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
