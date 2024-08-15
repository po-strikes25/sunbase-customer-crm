import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {

  customersArray: any[] = [];

  POST_API: string = "http://localhost:9900/crm-api/post-customer";
  GET_BY_ID_API: string = "http://localhost:9900/crm-api/get-customer/";

  currentCustomerID: any;

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

  constructor(
    public httpClient: HttpClient,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loadCustomer();
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
    this.httpClient.post(this.POST_API, this.customer, { responseType: 'text' })
      .subscribe(
        (data) => {
          alert('Customer registered successfully !');
          this.resetFields();
        });
  }

  loadCustomer() {
    this.route.paramMap.subscribe(params => {
      this.currentCustomerID = params.get('id');
      console.log(this.currentCustomerID);
      if (this.currentCustomerID) {
        this.fetchCustomerData(this.currentCustomerID);
      }
    });
  }

  fetchCustomerData(customerID: any) {
    this.httpClient.get(this.GET_BY_ID_API + `${customerID}`)
      .subscribe(
        (data: any) => {
          this.customer = data;
          console.log(data);
        });
  }
}
