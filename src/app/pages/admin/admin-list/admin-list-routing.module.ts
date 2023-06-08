import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminListPage} from './admin-list.page';

const routes: Routes = [
  {
    path: '',
    component: AdminListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminListPageRoutingModule {
}
