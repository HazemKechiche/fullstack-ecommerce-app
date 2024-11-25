import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterEvent, RouterLink, RouterLinkWithHref } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HeaderService } from '../header/header.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {



  //user : User[]=[{id:1,username:'hazem',password:'123',email:'hazem@gmail.com'}]
 //username = this.user.find(a=>a.id==1);
 constructor(private router: Router,private userService: UserService,private headerService: HeaderService) {}
 
  UserForm !: FormGroup
    ngOnInit(): void{
      this.UserForm = new FormGroup({
      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required),

    })
    //localStorage.clear();

    console.log(localStorage);

  }
  login(): boolean {
    if (this.UserForm.valid) {
      const Data = this.UserForm.value;

      this.userService.login(Data).subscribe({
        next: response => {
          this.userService.storeToken(response.token);
          console.log(response.token);
          //window.location.reload();
          this.headerService.setUserLoggedIn(true); 
          this.router.navigate(['/home']);
          return true;
         
        },
        error: err => {
          console.error("Login error:", err);
          return false;
        }
      });
    }
    return false;
  }
  

  submit() {
    if (this.UserForm.valid) {
      this.router.navigate(['/home']);
    } else {
      console.log('Error: Form is invalid');
    }
  }
 
}
