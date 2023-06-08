import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ArtistPageRoutingModule} from './artist-routing.module';

import {ArtistPage} from './artist.page';
import {ChangePictureComponent} from "./change-picture/change-picture.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ArtistPage, ChangePictureComponent]
})
export class ArtistPageModule {
}
