import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './../../common/shared/shared.module';
import { HomeComponent } from './containers/home/home.component';

import { HomeRoutingModule } from './home-routing.module';
import { ListgroupComponent } from './components/listgroup/listgroup.component';
import { AddressComponent } from './components/address/address.component';
import { CompanyComponent } from './components/company/company.component';
import { ActionsComponent } from './components/actions/actions.component';
import { UserFormComponent } from './containers/user-form/user-form.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { BasicComponent } from './components/basic/basic.component';

@NgModule({
  declarations: [HomeComponent, ListgroupComponent,
    AddressComponent, CompanyComponent,
    ActionsComponent, UserFormComponent, ItemDetailsComponent, BasicComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [ItemDetailsComponent]
})
export class HomeModule { }
