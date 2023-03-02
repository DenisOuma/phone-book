import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs';
// import { EventEmitter } from 'stream';

import { Contact } from 'src/app/models/Contact';
import { User } from 'src/app/models/User';

import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styles: [],
})
export class ContactformComponent {
  @ViewChild('formDirective') formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private contactService: ContactService
  ) {
    this.form = this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),

      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      type: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }
  onSubmit(
    formData: Pick<Contact, 'firstName' | 'lastName' | 'email' | 'phone'>
  ): void {
    this.contactService
      .createContact(formData, this.authService.userId as Pick<User, 'id'>)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
    console.log(formData);
    this.create.emit();
    this.form.reset();

    this.formDirective.resetForm();
  }
}
