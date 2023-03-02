import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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

  filterContacts(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
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

  deleteContact(contactId: Pick<Contact, '_id'>): void {
    console.log('selected Id ==>', contactId);
    if (this.contact$) {
      this.contactService
        .deleteContact({ _id: contactId._id })
        .subscribe(() => {
          console.log('Contact deleted successfully!');
          this.contact$ = this.contact$?.pipe(
            map((contacts) =>
              contacts.filter((contact) => contact._id !== contactId._id)
            )
          );
        });
    }
  }
}
