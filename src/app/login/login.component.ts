import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
  
    if (this.loginForm.invalid) {
      return;
    }
  
    this.loading = true;
    const username = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    this.authService.login(username, password).subscribe({
      next: (response) => {
        if (response && response.result && response.result.token) {
          const token = response.result.token;
          this.authService.setToken(token);
          this.authService.setCurrentUser(response.result);
          this.authService.setPersist(response.tenantDetail);
          
          this.router.navigate(['/lead']);
        } else {
          this.errorMessage = 'Invalid response structure from server.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Incorrect email or password.';
        this.loading = false;
      }
    });
  }
  
}
