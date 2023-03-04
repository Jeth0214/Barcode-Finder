import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { truncate } from 'fs';
import { first } from 'rxjs';
import { User } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';

interface RESPONSE {
  status: string;
  message: string;
  user: User | [];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isLoggingIn: boolean = false;
  response: RESPONSE;

  constructor(
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setLoginForm();
  }


  setLoginForm() {
    this.loginForm = this.formbuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  };

  // access form control easily
  get f() { return this.loginForm.controls };

  onLogin(formValue) {
    this.isLoggingIn = true;
    this.response = null;
    console.log('formValue', formValue);
    let data: User = {
      role: 'admin',
      ...formValue
    };
    this.onSubmit(data);
  }

  onTryDemo() {
    console.log('try demo');
    let data: User = {
      name: 'Demo User',
      role: 'demo',
      password: '123456'
    };
    this.onSubmit(data);
  }

  onSubmit(data) {
    console.log('data to send to server', data);
    this.authenticationService.login(data)
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log('response from api', response);
          this.loginForm.reset();
          this.isLoggingIn = false;
          this.response = response;
          this.router.navigate(['/home']);
        },
        error: error => {
          this.isLoggingIn = false;
          this.response = error.error;
          console.log(this.response);
        }
      });
  }

}
