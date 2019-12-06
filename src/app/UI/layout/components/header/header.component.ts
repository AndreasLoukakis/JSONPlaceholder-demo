import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Link } from './../../containers/shell/shell.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input()
  navLinks: Link[];

  @Input()
  links: Link[];

  @Input()
  userSignedIn: boolean;

  constructor() { }

  ngOnInit() {
  }

}
