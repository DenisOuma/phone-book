import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';

import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/api';
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/users`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('signup')),
        tap((response: User) => console.log('Signup response:', response))
      );
  }

  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(
        `${this.url}/auth`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        first(),
        tap((tokenObject: { token: string }) =>
          console.log('Login token:', tokenObject.token)
        ),
        catchError(
          this.errorHandlerService.handleError<{ token: string }>('login')
        )
      );
  }
}
