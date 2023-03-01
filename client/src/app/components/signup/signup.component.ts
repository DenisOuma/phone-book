import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(private authService: AuthService) {
    this.signupForm = this.createFormGroup();
  }

  ngOnInit(): void {
    // this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  signup(): void {
    this.authService
      .signup(this.signupForm.value)
      .subscribe((msg: any) => console.log(msg));
  }
}
