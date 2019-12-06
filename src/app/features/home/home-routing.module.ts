import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { UserFormComponent } from './containers/user-form/user-form.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'edit/:id', component: UserFormComponent },
    { path: 'create', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
