import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private tokenSubject: BehaviorSubject<string>;
  public token: Observable<string>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.tokenSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('token')));
    this.token = this.tokenSubject.asObservable();
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get tokenValue(): string {
    return this.tokenSubject.value;
  }

  login(user: User) {
    return this.http.post<any>(`${environment.apiBaseUrl}/login`, user)
      .pipe(map(
        response => {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', JSON.stringify(response.token));
          this.currentUserSubject.next(response.user);
          this.tokenSubject.next(response.token);
          return response
        }));
  }

  logout() {
    // logout  user from api
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
    return this.http.post<any>(`${environment.apiBaseUrl}/logout`, this.currentUserValue)

  }
}
