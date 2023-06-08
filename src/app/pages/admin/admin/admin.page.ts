import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.loadingCtrl.create({keyboardClose: true, message: 'Logging out...'})
      .then(loadingEl => {
        loadingEl.present();
        localStorage.removeItem('token');
        setTimeout(() => {
          loadingEl.dismiss();
          this.router.navigateByUrl('/login');
        }, 1500);
      });
  }

}
