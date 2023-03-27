import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { truncate } from 'fs';
import { first } from 'rxjs';
import { User } from '../models/user.model';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isLoggingIn: boolean = false;



  constructor(
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
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
    let data: User = {
      role: 'admin',
      ...formValue
    };
    this.onSubmit(data);
  }

  onTryDemo() {
    let data: User = {
      role: 'demo',
      name: 'Demo User',
      password: '123456'
    };
    this.onSubmit(data);
  }

  onSubmit(data) {
    //console.log('login data', data);
    this.isLoggingIn = true;
    this.authenticationService.login(data)
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log('login response: ' + response);
          this.loginForm.reset();
          this.isLoggingIn = false;
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          // console.log(error)
          this.isLoggingIn = false;
          this.alertService.alertError(error.status, error)
        }
      });
  }

}
