import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  logo: string = 'Keeper';
  icon: string = 'fas fa-id-card-alt';
  iconName: string = 'perm_contact_calendar';

  isAuthenticated = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    });
  }
  logout(): void {
    localStorage.removeItem('token');
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(['signin']);
  }
}
