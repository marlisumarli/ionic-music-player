import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AlbumDetailPageRoutingModule} from './album-detail-routing.module';

import {AlbumDetailPage} from './album-detail.page';
import {RequestSongComponent} from "../request-song/request-song.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumDetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AlbumDetailPage, RequestSongComponent]
})
export class AlbumDetailPageModule {
}
