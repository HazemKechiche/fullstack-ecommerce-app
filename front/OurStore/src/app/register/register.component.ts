import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router,private rs: RegisterService) {}
  UserForm !: FormGroup


  ngOnInit(): void {
    this.UserForm = new FormGroup({
      surname: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
  }
  onSubmit(): void {
    // Handle form submission
    if (this.UserForm.valid) {
      // Form is valid, submit the data
      const userData = this.UserForm.value;
      this.rs.registerUser(userData).subscribe(response => {
        console.log(response); // Log the response from the backend
        // Optionally, navigate to another page after successful registration
        this.router.navigate(['/login']);
      });
      console.log(userData); // You can send this data to your backend API for registration
    } else {
      console.log("error"); // You can send this data to your backend API for registration

      // Form is invalid, show error message or take appropriate action
    }
  }

}
