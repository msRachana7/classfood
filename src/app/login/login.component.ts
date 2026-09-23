import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginError = 'Please enter a valid email and password.';
      return;
    }

    const email = this.loginForm.value.email.trim();
    const password = this.loginForm.value.password;

    const defaultUser = { email: 'admin@test.com', password: 'admin123' };
    const savedUser = JSON.parse(localStorage.getItem('signupUser') || 'null');
    const validUser = savedUser
      ? savedUser.email === email && savedUser.password === password
      : defaultUser.email === email && defaultUser.password === password;

    if (validUser) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigateByUrl('/home');
      return;
    }

    this.loginError = 'Invalid username or password. Please sign up or try again.';
    this.loginForm.reset();
  }

  tryAgain() {
    this.loginError = '';
    this.loginForm.reset();
    this.loginForm.markAsPristine();
  }
}
