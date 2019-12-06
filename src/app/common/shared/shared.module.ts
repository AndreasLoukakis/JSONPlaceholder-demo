import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidationErrorsComponent } from './components/validation-errors/validation-errors.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [PaginationComponent, ValidationErrorsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [FontAwesomeModule, PaginationComponent, ValidationErrorsComponent]
})
export class SharedModule { }
