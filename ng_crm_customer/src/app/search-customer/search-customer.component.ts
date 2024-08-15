import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent {

  customersRecords: any[] = [];

  GET_API: string = "http://localhost:9900/crm-api/get-all-customers";
  DELETE_API: string = "http://localhost:9900/crm-api/delete-customer/";

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
    public router: Router
  ) {
  }

  search() {
    this.httpClient.get(this.GET_API, {})
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
    this.httpClient.delete(this.DELETE_API + currentCustomerID)
      .subscribe(
        (data: any) => {
          console.log(data);
        });
  }
}
