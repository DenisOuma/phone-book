import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  logo: string = 'Phone Book';
  icon: string = 'fas fa-id-card-alt';
  iconName: string = 'perm_contact_calendar';
}
