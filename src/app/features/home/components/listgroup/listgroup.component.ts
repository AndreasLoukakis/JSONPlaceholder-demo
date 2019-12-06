import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../../../../common/models/user.interface';
import { PaginationData } from './../../../../common/models/paginationData';

@Component({
  selector: 'app-listgroup',
  templateUrl: './listgroup.component.html',
  styleUrls: ['./listgroup.component.scss']
})
export class ListgroupComponent implements OnInit {

  @Input()
  collection: Observable<User[]>;
  
  @Input()
  paginationData$: Observable<PaginationData>;

  @Input()
  listClass: string;
  
  @Input()
  listColumns: {val: string, desc: string}[];

  @Output()
  edit: EventEmitter<number> = new EventEmitter();
  
  @Output()
  delete: EventEmitter<number> = new EventEmitter();
  
  @Output()
  pageChange: EventEmitter<number> = new EventEmitter();
  
  @Output()
  details: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEdit(e) {
    this.edit.emit(e);
  }

  onDelete(e) {
    this.delete.emit(e);
  }
  
  onDetails(e) {
    this.details.emit(e);
  }

  onPageChange(e) {
    this.pageChange.emit(e);
  }

}
