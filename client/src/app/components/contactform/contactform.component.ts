import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styles: [],
})
export class ContactformComponent {
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
  onSubmit(): void {
    console.log('contact');
  }
}
