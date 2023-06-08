import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AdminListPageRoutingModule} from './admin-list-routing.module';

import {AdminListPage} from './admin-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminListPageRoutingModule
  ],
  declarations: [AdminListPage]
})
export class AdminListPageModule {
}
