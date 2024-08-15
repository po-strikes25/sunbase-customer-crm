import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent {

  customersRecords: any[] = [];

  GET_API: string = "http://localhost:9900/crm-api/get-all-customers";

  customer = {
    first_name: '',
    last_name: '',
    street: '',
    address: '',
    city: '',
    state: '',
    email: '',
    phone: ''
  }

  constructor(public httpClient: HttpClient) {

  }

  search() {
    this.httpClient.get(this.GET_API, {})
      .subscribe(
        (data: any) => {
          this.customersRecords = data;
          console.log(this.customersRecords);
        });
  }
}
