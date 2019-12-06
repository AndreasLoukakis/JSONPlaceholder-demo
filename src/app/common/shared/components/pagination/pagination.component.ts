import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationData } from './../../../models/paginationData';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  paginationData$: Observable<PaginationData>;

  @Input()
  items: any[];

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter();

  pages: number[] = [];
  currentPage: number;

  constructor() { }

  ngOnInit() {
    this.paginationData$.subscribe(
      pageData => {
        this.pages = [];
        this.currentPage = pageData.currentPage;
        const totalpages = Math.ceil(pageData.totalItems / pageData.itemsPerPage);
        for (let i = 1; i <= totalpages; i++) { this.pages.push(i); }
      }
    )
    
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

}
