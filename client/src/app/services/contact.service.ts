import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/Contact';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { first, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private url = 'http://localhost:3000/api/contacts';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchContacts(): Observable<Contact[]> {
    return this.http
      .get<Contact[]>(this.url)
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Contact[]>('fetchAll', [])
        )
      );
  }
  createContact(
    formData: Partial<Contact>,
    userId: Pick<User, 'id'>
  ): Observable<Contact> {
    return this.http
      .post<Contact>(
        this.url,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          type: formData.type,
          user: userId,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Contact>('createContact')
        )
      );
  }

  deleteContact(contactId: Pick<Contact, 'id'>): Observable<{}> {
    return this.http
      .delete<Contact>(`${this.url}/${contactId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Contact>('deleteContact')
        )
      );
  }
}
