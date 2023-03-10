import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/Contact';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { first, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { map } from 'rxjs/operators';

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
    return this.http.get<Contact[]>(this.url).pipe(
      map((contacts) => {
        console.log(contacts);
        return contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
      }),
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

  deleteContact(contactId: Pick<Contact, '_id'>): Observable<{}> {
    console.log(contactId._id);
    return this.http
      .delete<Contact>(`${this.url}/${contactId._id}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Contact>('deleteContact')
        )
      );
  }
}
