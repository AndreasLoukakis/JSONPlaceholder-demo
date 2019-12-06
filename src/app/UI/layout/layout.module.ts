import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './containers/shell/shell.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from './../../common/shared/shared.module';

@NgModule({
  declarations: [ShellComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    ShellComponent, HeaderComponent, FooterComponent
  ]
})
export class LayoutModule { }
