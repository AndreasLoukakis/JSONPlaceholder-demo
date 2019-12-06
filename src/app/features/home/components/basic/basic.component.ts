import { Component, OnInit, Input } from '@angular/core';
import { User } from './../../../../common/models/user.interface';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  @Input()
  item: User;
  
  @Input()
  listColumns: {val: string, desc: string}[];
  
  @Input()
  mode: string;

  constructor() { }

  ngOnInit() {
  }

}
