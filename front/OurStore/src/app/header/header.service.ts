import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient,private userService: UserService) { }

  getCurrent(): Observable<any> {
    const token = this.userService.getToken();
    console.log(token);
    if (!token) {
      throw new Error('No token found');
    }

    // Include the token in the Authorization header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any>('http://localhost:8080/user/current', { headers,responseType: 'text' as 'json' });
  }
  private userLoggedInSubject = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedInSubject.asObservable();

  setUserLoggedIn(isLoggedIn: boolean): void {
    this.userLoggedInSubject.next(isLoggedIn);}
 
  
}
