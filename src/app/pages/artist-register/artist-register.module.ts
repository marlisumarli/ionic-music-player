import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ArtistRegisterPageRoutingModule} from './artist-register-routing.module';

import {ArtistRegisterPage} from './artist-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistRegisterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ArtistRegisterPage]
})
export class ArtistRegisterPageModule {
}
