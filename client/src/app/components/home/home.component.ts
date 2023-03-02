import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/User';
import { Contact } from 'src/app/models/Contact';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  contact$: Observable<Contact[]> | undefined = undefined;
  userId: number | undefined;
  constructor(
    private contactService: ContactService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.contact$ = this.fetchContacts();
    this.userId = this.authService.userId?.id;
  }

  fetchContacts(): Observable<Contact[]> {
    return this.contactService.fetchContacts();
  }
  createContact(): void {
    this.contact$ = this.fetchContacts();
  }
  deleteContact(contactId: Pick<Contact, 'id'>): void {
    this.contactService
      .deleteContact(contactId)
      .subscribe(() => (this.contact$ = this.fetchContacts()));
  }
}
