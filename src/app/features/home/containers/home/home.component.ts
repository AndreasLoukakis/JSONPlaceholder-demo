import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PaginationData } from './../../../../common/models/paginationData';
import { ItemDetailsComponent } from './../../components/item-details/item-details.component';
import { HomeService } from './../../services/home.service';
import { User } from './../../../../common/models/user.interface';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usersData$: Observable<User[]>;
  deletedUsers: number[] = [];
  plusIcon = faPlusSquare;

  defaultPaginationData = {
    itemsPerPage: 5,
    startItem: 0,
    totalItems: 0
  };
  paginationData: BehaviorSubject<PaginationData> = new BehaviorSubject(this.defaultPaginationData);

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
      // a hack to be able to simulate deletion
      .pipe(
        map(users => users.filter( user => this.deletedUsers.indexOf(user.id) === -1)),
        // simulate created and edited user functionality
        map(users => {
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
        }),
        // mock pagination
        map(users => {
          const paginatedUsers = users.slice(this.paginationData.startItem, this.paginationData.itemsPerPage);
          this.paginationData.totalItems = users.length;
          return paginatedUsers;
        })
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
        response => {
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
    debugger;
  }

}
