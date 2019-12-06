import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './containers/contact/contact.component';

import { AuthRoutingModule } from './contact-routing.module';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class ContactModule { }
