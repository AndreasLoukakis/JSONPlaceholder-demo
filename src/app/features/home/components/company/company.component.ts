import { Component, OnInit, Input } from '@angular/core';
import { CompanyData } from './../../../../common/models/user.interface';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @Input()
  company: CompanyData;

  constructor() { }

  ngOnInit() {
  }

}
