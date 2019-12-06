import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from './../../../../common/models/user.interface';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input()
  item: User;

  @Input()
  mode: string;

  @Output()
  edit: EventEmitter<number> = new EventEmitter();

  @Output()
  delete: EventEmitter<number> = new EventEmitter();
  
  @Output()
  details: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.edit.emit(this.item.id);
  }

  onDelete() {
    this.delete.emit(this.item.id);
  }
  
  onDetails() {
    this.details.emit(this.item);
  }

}
