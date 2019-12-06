import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationData } from './../../../models/paginationData';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  paginationData: PaginationData;

  @Input()
  items: any[];

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter();

  pages: number[];

  constructor() { }

  ngOnInit() {
    const totalpages = Math.ceil(this.paginationData.totalItems / this.paginationData.itemsPerPage);
    for (let i = 0; i < totalpages; i++) { this.pages.push(i); }
    debugger
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

}
