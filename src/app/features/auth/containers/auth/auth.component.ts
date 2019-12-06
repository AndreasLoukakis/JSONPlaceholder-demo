import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  username: string;
  password: string;

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logMeIn() {
    // getting credentials from class props
    this.service.login({username: this.username, password: this.password }).subscribe(
      ({isOk, token}) => {
        if (isOk) {
          sessionStorage.setItem('token', token);
          this.router.navigate(['home']);
        } else {
          alert('Invalid credentials');
        }
      }
    );
  }

}
