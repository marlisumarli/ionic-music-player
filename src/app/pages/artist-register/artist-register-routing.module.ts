import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistRegisterPage } from './artist-register.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistRegisterPageRoutingModule {}
