import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent {

  customersRecords: any[] = [];

  GET_API: string = "http://localhost:9900/crm-api/get-all-customers";
  DELETE_API: string = "http://localhost:9900/crm-api/delete-customer/";

  headers = new HttpHeaders().set('Authorization', `Bearer ${this.loginService.fetchToken()}`);

  customer = {
    customer_id: '',
    first_name: '',
    last_name: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: ''
  }

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public loginService: LoginService
  ) {
  }

  search() {

  }

  sync() {
    this.httpClient.get(this.GET_API, { headers: this.headers })
      .subscribe(
        (data: any) => {
          this.customersRecords = data;
        });
  }

  edit(customer: any) {
    this.router.navigate(['/edit-customer', customer.customer_id]);
  }

  delete(customer: any) {
    let currentCustomerID = customer.customer_id;
    console.log(currentCustomerID);
    this.httpClient.delete(this.DELETE_API + currentCustomerID, { headers: this.headers })
      .subscribe(
        (data: any) => {
          console.log(data);
        });
  }
}
