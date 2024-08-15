import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {

  customersArray: any[] = [];

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

  constructor() {
    // TO DO: HTTP CLIENT 
  }

  ngOnInit() {

  }

  submit() {
    // TO DO
    // Hit POST API and create a customer
  }
}
