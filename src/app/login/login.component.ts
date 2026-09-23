import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.value;
    const storedUser = JSON.parse(localStorage.getItem('signupUser') || '{}');
    const validEmail = 'admin@test.com';
    const validPassword = 'admin123';

    const isAdminMatch = formValue.email === validEmail && formValue.password === validPassword;
    const isSignedUpMatch =
      storedUser.email &&
      formValue.email === storedUser.email &&
      formValue.password === storedUser.password;

    if (isAdminMatch || isSignedUpMatch) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigateByUrl('/home');
      return;
    }

    this.loginError = 'Invalid username or password. Please sign up or try again.';
  }

  tryAgain(): void {
    this.loginError = '';
    this.loginForm.reset();
  }
}
