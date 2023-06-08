import {Component, OnInit} from '@angular/core';
import {ApiArtistService} from "../../../services/api-artist.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  data: any;

  constructor(
    private apiArtist: ApiArtistService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.apiArtist.fetchDataDashboard();
    this.apiArtist.data.subscribe(data => this.data = data);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.apiArtist.fetchDataDashboard();
      this.apiArtist.data.subscribe(data => this.data = data);
      event.target.complete();
    }, 1000);
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
