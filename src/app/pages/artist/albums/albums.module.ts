import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AlbumsPageRoutingModule} from './albums-routing.module';

import {AlbumsPage} from './albums.page';
import {NewAlbumComponent} from "../new-album/new-album.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AlbumsPage, NewAlbumComponent]
})
export class AlbumsPageModule {
}
