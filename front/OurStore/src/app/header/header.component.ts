import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from './header.service';
import { UserService } from '../services/user.service';
import { HomeComponent } from '../home/home.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { User } from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(UserLoginComponent) loginComponent!: UserLoginComponent;
  imagePath: string = "../assets/images/";
  userIsLoggedIn: boolean = false; // Initial assumption: user is not logged in
  userName: string = 'John Doe'; // Placeholder, will be replaced by real user name
  userAvatarUrl: string = '../assets/images/usrAvatr.png'; // Placeholder, you can change as needed
  isMenuOpen = false; 

  constructor(private headerService: HeaderService, private userService: UserService) {

  }

  ngOnInit(): void {
    
    this.headerService.getCurrent().subscribe({
      next: response => {
        this.userName = response;
        this.userIsLoggedIn = true; // Assume user is logged in if we successfully fetch user data
      },
      error: error => {
        console.error('Error fetching current user', error);
        this.userIsLoggedIn = false; // Set to false if there is an error
        
      }
      
    });
    this.headerService.userLoggedIn$.subscribe(isLoggedIn => {
      this.userIsLoggedIn = isLoggedIn;
      window.location.reload;
    });
    
   
  //  if(this.Login.login()==true)
  //   
  }

  logout(): void {
    this.userService.logout();
    this.userIsLoggedIn = false; // Update the login status
    
  }

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}
}
