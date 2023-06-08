import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ArtistPage} from './artist.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: ArtistPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'albums',
        children: [
          {
            path: '',
            loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsPageModule)
          },
          {
            path: ':albumId',
            children: [
              {
                path: '',
                loadChildren: () => import('./album-detail/album-detail.module').then(m => m.AlbumDetailPageModule)
              },
              {
                path: 'song/:songId',
                loadChildren: () => import('./song/song.module').then(m => m.SongPageModule)
              }
            ]
          }
        ]
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/artist/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'request-songs',
    loadChildren: () => import('./request-songs/request-songs.module').then(m => m.RequestSongsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistPageRoutingModule {
}
