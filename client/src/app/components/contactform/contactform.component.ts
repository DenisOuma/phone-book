import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/Contact';
@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styles: [],
})
export class ContactformComponent {
  @ViewChild('formDirective') formDirective!: NgForm;
  form: FormGroup;

  constructor() {
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
    console.log(formData);
    this.formDirective.resetForm();
  }
}
