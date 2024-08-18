import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  LOGIN_API = 'http://localhost:9900/crm-api/login';

  constructor(
    public httpClient: HttpClient,
    public router: Router
  ) { }

  processLogin(username: string, password: string) {
    return this.httpClient.post(this.LOGIN_API, { "username": username, "password": password });
  }

  loginUser(authToken: any) {
    localStorage.setItem("Token", authToken);
    return true;
  }

  isUserLoggedIn() {
    let authToken = localStorage.getItem("Token");
    if (authToken == undefined || authToken == null || authToken == '') {
      return false;
    }
    return true;
  }

  fetchToken() {
    return localStorage.getItem("Token");
  }

  logout() {
    localStorage.removeItem("Token");
    return true;
  }
}
