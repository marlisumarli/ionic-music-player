import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PrivacySecurityPage} from './privacy-security.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacySecurityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacySecurityPageRoutingModule {
}
