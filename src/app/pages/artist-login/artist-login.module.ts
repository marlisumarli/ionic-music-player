import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ArtistLoginPageRoutingModule} from './artist-login-routing.module';

import {ArtistLoginPage} from './artist-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistLoginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ArtistLoginPage]
})
export class ArtistLoginPageModule {
}
