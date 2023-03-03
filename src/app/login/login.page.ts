import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setLoginForm();
  }


  setLoginForm() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  };

  // access form control easily
  get f() { return this.loginForm.controls };

  onLogin(formValue) {
    console.log('onLogin', formValue);
  }

}
