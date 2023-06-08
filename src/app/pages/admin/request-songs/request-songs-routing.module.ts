import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RequestSongsPage} from './request-songs.page';

const routes: Routes = [
  {
    path: '',
    component: RequestSongsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestSongsPageRoutingModule {
}
