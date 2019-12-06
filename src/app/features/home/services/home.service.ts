import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../../../common/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiURI = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURI}/users`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiURI}/users/${id}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURI}/users/${id}`);
  }

  updateUser(id: number, data: User): Observable<User> {
    return this.http.put<User>(`${this.apiURI}/users/${id}`, data);
  }

  createUser(data: User): Observable<User> {
    return this.http.post<User>(`${this.apiURI}/users`, data);
  }
}
