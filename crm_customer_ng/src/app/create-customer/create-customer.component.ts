import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent {

  StudentsArray: any[] = [];

  first_name: string = '';
  last_name: string = '';
  street: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  email: string = '';
  phone: string = '';

  customer_id = '';

  constructor(private http: HttpClient) {
  }

  register() {
    let customerObj = {
      'first_name': this.first_name,
      'last_name': this.last_name,
      'street': this.street,
      'address': this.address,
      'city': this.city,
      'state': this.state,
      'email': this.email,
      'phone': this.phone
    };

    this.http.post(
      'http://localhost:9900/crm-api/post-customer', customerObj, { responseType: 'text' }
    ).subscribe((data: any) => {
      console.log(data);
      alert('Customer registered successfully !');

    });
  }

  save() {
    this.register();
  }
}
