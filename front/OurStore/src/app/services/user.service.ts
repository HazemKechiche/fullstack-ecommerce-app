import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenKey: string = 'authToken';

  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    // Send HTTP POST request to the /user/signup endpoint with the user data
    return this.http.post<any>('http://localhost:8080/user/signup', userData);
  }
  login(credentials: any) {
    console.log(credentials);
    return this.http.post<any>('http://localhost:8080/user/login', credentials);
    
  }
  storeToken(token: string): void {
    console.log(token);
    localStorage.setItem(this.tokenKey, token);
  }

  logout() {
    // Clear token from local storage or session storage
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  

}
