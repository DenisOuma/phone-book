import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  filteredContacts$: Observable<Contact[]> | undefined = undefined;
  userId: number | undefined;
  searchTerm: string = '';

  constructor(
    private contactService: ContactService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.contact$ = this.fetchContacts();
    this.filteredContacts$ = this.contact$;
    this.userId = this.authService.userId?.id;
  }

  fetchContacts(): Observable<Contact[]> {
    return this.contactService.fetchContacts();
  }

  filterContacts(searchTerm: string): void {
    console.log(searchTerm);
    this.filteredContacts$ = this.contact$?.pipe(
      map((contacts) =>
        contacts.filter(
          (contact) =>
            contact.firstName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  createContact(): void {
    this.contact$ = this.fetchContacts();
  }

  deleteContact(contactId: Pick<Contact, 'id'>): void {
    console.log('selected Id ==>', contactId);
    this.contactService
      .deleteContact(contactId)
      .subscribe(() => (this.contact$ = this.fetchContacts()));
  }
}
