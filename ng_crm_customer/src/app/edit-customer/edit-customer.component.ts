import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {

  customersArray: any[] = [];

  POST_API: string = "http://localhost:9900/crm-api/post-customer";

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

  ngOnInit() {

  }

  createCustomer() {
    this.customer = {
      'first_name': this.customer.first_name,
      'last_name': this.customer.last_name,
      'street': this.customer.street,
      'address': this.customer.address,
      'city': this.customer.city,
      'state': this.customer.state,
      'email': this.customer.email,
      'phone': this.customer.phone
    };
  }

  resetFields() {
    this.customer = {
      first_name: '',
      last_name: '',
      street: '',
      address: '',
      city: '',
      state: '',
      email: '',
      phone: ''
    }
  }

  register() {
    this.createCustomer();
    console.log(this.customer);
    this.httpClient.post(this.POST_API, this.customer, { responseType: 'text' })
      .subscribe(
        (data) => {
          console.log(data);
          alert('Customer registered successfully !');
          this.resetFields();
        });
  }
}
