import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  request = {
    loginID: '',
    password: '',
  }

  constructor() {
    // TO DO: HTTP CLIENT 
  }

  ngOnInit() {

  }

  login() {
    // TO DO
    // Hit Authentication and Authorization API and create a customer
  }
}
