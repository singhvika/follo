import { AppState } from './../../app.state';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Login } from '../../models/login.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import * as TokenActions from './../../token-store/actions';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginData: Login;
  loginForm: FormGroup;
  private formSubmitAttempt: boolean;
  private isInvalidCred: boolean;
  errorMsg: string;
  loginError: string;
  constructor(private ls: LoginService, private fb: FormBuilder, private location: Location, private store: Store<any>, private router: Router) { }

  reset() {
    this.formSubmitAttempt = false;
    this.isInvalidCred = false;
    this.loginForm.reset();
  }

  ngOnInit() {
    this.isInvalidCred = false;
    this.formSubmitAttempt = false;
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      password: [null, Validators.required],
    });
    console.log('INSIDE LOGIN');
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.loginForm.valid) {
      this.loginData = new Login(this.loginForm.value);
      this.ls.doLogin(this.loginData).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log('LOGGED IN', res);
          localStorage.setItem('userAuth',JSON.stringify(res.body));
          console.log('localStorage');
          console.log(localStorage.getItem('userAuth'));
          this.store.dispatch(new TokenActions.AddToken(res.body));
          this.reset();
          console.log('now navigating');
          this.router.navigate(['content']);
        }
      }).catch(e => {
        console.log(e);
        this.isInvalidCred = true;
        this.loginError = "Invalid Credentials";
      })
      ;
    }
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return (((!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)) || this.isInvalidCred);
  }

  customErrorMsg(field: string) {
    if (field === 'email') {
      if (this.loginForm.get(field).hasError('required') ||
        this.loginForm.get(field).hasError('minlength')
        || this.loginForm.get(field).hasError('maxlength')) {
        return 'Username must be between 3 and 50 characters';
      } else {
        return this.errorMsg;
      }
    }
    if (field === 'password') {
      if (this.loginForm.get(field).hasError('required')) {
        return 'Please enter password';
      } else {
        return '';
      }
    }

  }
}
