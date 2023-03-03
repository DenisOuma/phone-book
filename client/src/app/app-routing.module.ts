import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import all the comonents
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AboutComponent } from './components/about/about.component';

import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'contacts',
    component: ContactComponent,
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// , canActivate: [AuthGuardService]
