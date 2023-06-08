import {Component, ViewChild} from '@angular/core';
import {IonTabs, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  @ViewChild(IonTabs) tabs: IonTabs;

  selectedTab: any;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController
  ) {

  }

  setSelectedTab() {
    this.selectedTab = this.tabs.getSelected();
  }

  onLogout() {
    this.loadingCtrl.create({
      message: 'Logging out'
    }).then(loadingEl => {
      loadingEl.present();
      localStorage.removeItem('token');
      setTimeout(() => {
        loadingEl.dismiss();
        this.router.navigateByUrl('/login');
      }, 1500);
    });
  }

}
