import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CheckLoginGuard} from "./guards/check-login.guard";
import {UserGuard} from "./guards/user.guard";
import {ArtistGuard} from "./guards/artist.guard";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserPageModule),
    canActivate: [CheckLoginGuard, UserGuard]
  },
  {
    path: 'artist',
    loadChildren: () => import('./pages/artist/artist.module').then(m => m.ArtistPageModule),
    canActivate: [CheckLoginGuard, ArtistGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [CheckLoginGuard, AdminGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'user-register',
    loadChildren: () => import('./pages/user-register/user-register.module').then(m => m.UserRegisterPageModule)
  },
  {
    path: 'artist-register',
    loadChildren: () => import('./pages/artist-register/artist-register.module').then(m => m.ArtistRegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'artist-login',
    loadChildren: () => import('./pages/artist-login/artist-login.module').then(m => m.ArtistLoginPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
