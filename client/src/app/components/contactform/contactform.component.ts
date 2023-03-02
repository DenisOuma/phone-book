import { Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/Contact';
// import { EventEmitter } from 'stream';
@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styles: [],
})
export class ContactformComponent {
  @ViewChild('formDirective') formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
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
    this.create.emit();
    this.form.reset();

    this.formDirective.resetForm();
  }
}
