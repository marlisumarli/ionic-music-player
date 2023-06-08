import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AlbumDetailPage} from './album-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumDetailPageRoutingModule {
}
