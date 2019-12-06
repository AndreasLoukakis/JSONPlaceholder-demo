import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import { PaginationData } from './../../../../common/models/paginationData';
import { ItemDetailsComponent } from './../../components/item-details/item-details.component';
import { HomeService } from './../../services/home.service';
import { User } from './../../../../common/models/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usersData$: Observable<User[]>;
  deletedUsers: number[] = [];
  plusIcon = faPlusSquare;

  currentPagination: PaginationData = {
    itemsPerPage: 5,
    startItem: 0,
    totalItems: 0,
    currentPage: 1
  };
  paginationData$: BehaviorSubject<PaginationData> = new BehaviorSubject(this.currentPagination);

  listColumns: {val: string, desc: string}[] = [
    {val: 'name', desc: 'Name'},
    {val: 'username', desc: 'Username'},
    {val: 'email', desc: 'Email'},
    {val: 'phone', desc: 'Phone'},
    {val: 'website', desc: 'Website'},
  ];
  constructor(
    private service: HomeService,
    private router: Router,
    public modal: NgbModal
  ) { }

  ngOnInit() {
    this.initUsers();
  }

  initUsers() {
    this.usersData$ = this.service.getUsers()
      // simulate CRUD & pagination
      .pipe(
        map(users => users.filter( user => this.deletedUsers.indexOf(user.id) === -1)),
        map(this.mockCrud),
        map(this.paginateUsers.bind(this))
      );
  }

  onEdit(e) {
    this.router.navigate(['home/edit', e]);
  }

  onCreate(e) {
    this.router.navigate([`home/create`]);
  }

  onDelete(id) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.service.deleteUser(id).subscribe(
        // faking deletion by filtering deleted ids
        _ => {
          this.deletedUsers.push(id);
          this.initUsers();
        }
      );
    }
  }

  onDetails(user) {
    const modalRef = this.modal.open(ItemDetailsComponent, { size: 'xl' });
    modalRef.componentInstance.item = user;
  }

  onPageChange(page) {  
    this.currentPagination.currentPage = page;
    this.currentPagination.startItem = this.currentPagination.currentPage * this.currentPagination.itemsPerPage - this.currentPagination.itemsPerPage;
    this.initUsers();
  }

  mockCrud(users) {
    const newUser: User | undefined = history.state.newUser;
    const alteredUser: User | undefined = history.state.alteredUser;
    if (newUser) {
      delete history.state.newUser;
      return [newUser, ...users];
    } else if (alteredUser) {
      delete history.state.alteredUser;
      return users.reduce((all, cur) => {
        cur.id === alteredUser.id ?
          all.push(alteredUser) :
          all.push(cur);
        return all;
      }, []);
    } else {
      return users;
    }
  }

  paginateUsers(users) {
    const paginatedUsers = users.slice(this.currentPagination.startItem, this.currentPagination.startItem + this.currentPagination.itemsPerPage);
    this.currentPagination.totalItems = users.length;
    this.paginationData$.next(this.currentPagination);
    return paginatedUsers;
  }

}
