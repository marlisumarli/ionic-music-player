import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ArtistLoginPage} from './artist-login.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistLoginPageRoutingModule {
}
