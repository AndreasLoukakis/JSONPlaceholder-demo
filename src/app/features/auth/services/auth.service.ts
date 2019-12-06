import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  login(credentials: {username: string, password: string}): Observable<{isOk: boolean, token: string}> {
    const credsAreValid = (credentials.username === 'a@b.com' && credentials.password === '123');

    if (credsAreValid) { this.userStatus(true); }
    return credsAreValid ?
      of({isOk: true, token: 'yolo'}) :
      of({isOk: false, token: ''});
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.userAuthenticated.next(false);
  }

  userStatus(newStatus): void {
    this.userAuthenticated.next(newStatus);
  }
}
