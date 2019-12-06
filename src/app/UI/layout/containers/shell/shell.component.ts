import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { Subscription } from 'rxjs';
import { faHome, faMailBulk, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from './../../../../features/auth/services/auth.service';

export interface Link {
  title: string;
  route?: string;
  icon?: IconDefinition;
  action?: () => void;
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {

  menuItems: Link[];
  links: Link[];

  subs: Subscription[] = [];
  userSignedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.menuItems = [
      {title: 'Home', route: 'home', icon: faHome },
      {title: 'Contact', route: 'contact', icon: faMailBulk}
    ];

    this.links = [
      {title: 'Logout', action: this.logMeOut.bind(this), icon: faSignOutAlt}
    ];

    this.subs.push(
      this.authService.userAuthenticated.subscribe( authStatus => this.userSignedIn = authStatus)
    );
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }

  logMeOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
