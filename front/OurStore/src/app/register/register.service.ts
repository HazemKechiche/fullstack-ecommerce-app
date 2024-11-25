import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    // Send HTTP POST request to the /user/signup endpoint with the user data
    const headers = { 'Content-Type': 'application/json' };
  
    return this.http.post<any>('http://localhost:8080/user/signup', userData, { headers });
  }
  
}
