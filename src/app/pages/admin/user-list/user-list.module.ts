import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserListPageRoutingModule} from './user-list-routing.module';

import {UserListPage} from './user-list.page';
import {NewUserComponent} from "../new-user/new-user.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserListPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserListPage, NewUserComponent]
})
export class UserListPageModule {
}
