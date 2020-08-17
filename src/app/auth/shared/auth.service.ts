import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequestPayload} from "../signup/signup-request.payload";
import {Observable} from "rxjs";
import {LoginResponse} from "../login/login.response.payload";
import {LoginRequest} from "../login/login.request.payload";
import {map} from "rxjs/operators";
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, {responseType: 'text'})
  }

  // @ts-ignore
  login(loginRequest: LoginRequest): Observable<boolean> {
    this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequest)
      .pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('expiresAt', data.expiresAt);
      return true;
      }));
  }
}
