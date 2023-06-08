import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ArtistListPage} from './artist-list.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistListPageRoutingModule {
}
