import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {RequestSongsPageRoutingModule} from './request-songs-routing.module';

import {RequestSongsPage} from './request-songs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestSongsPageRoutingModule
  ],
  declarations: [RequestSongsPage]
})
export class RequestSongsPageModule {
}
