import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  LOGIN_API: string = "http://localhost:9900/crm-api/login";

  request = {
    loginID: '',
    password: '',
  }

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public loginService: LoginService
  ) {
  }

  ngOnInit() {

  }

  forgotUsername() {
    // this.router.navigate(['/edit-customer', 0]);
  }

  onSubmit() {
    this.loginService.generateToken(this.request.loginID, this.request.password).subscribe(
      (data: any) => {
        console.log(data);
        alert('Loggedin successfully !');
        this.loginService.loginUser(data.jwtToken);
        this.router.navigate(['/search-customer']);
      });
  }

  reset() {
    this.request.loginID = '';
    this.request.password = '';
  }

}
