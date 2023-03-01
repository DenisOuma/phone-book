import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [],
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(private authService: AuthService) {
    this.signinForm = this.createFormGroup();
  }

  ngOnInit(): void {
    // this.signupForm = this.createFormGroup();
  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  login(): void {
    console.log('Welcome');
  }
}
