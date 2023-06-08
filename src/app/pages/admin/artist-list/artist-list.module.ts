import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ArtistListPageRoutingModule} from './artist-list-routing.module';

import {ArtistListPage} from './artist-list.page';
import {NewArtistComponent} from "../new-artist/new-artist.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistListPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ArtistListPage, NewArtistComponent]
})
export class ArtistListPageModule {
}
