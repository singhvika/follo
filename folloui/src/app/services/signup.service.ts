import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signup } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
  httpHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });
  signupService(signupData: Signup) {
    console.log('Inside Service', signupData);
    return this.http.post<string>('http://localhost:3000/user/signup/', signupData, { headers: this.httpHeaders, observe: 'response' });
  }
}
