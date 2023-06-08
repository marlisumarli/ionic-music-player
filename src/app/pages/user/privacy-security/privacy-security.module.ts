import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PrivacySecurityPageRoutingModule} from './privacy-security-routing.module';

import {PrivacySecurityPage} from './privacy-security.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacySecurityPageRoutingModule
  ],
  declarations: [PrivacySecurityPage]
})
export class PrivacySecurityPageModule {
}
