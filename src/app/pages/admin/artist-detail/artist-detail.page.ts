import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ArtistModel} from "../../../model/artist.model";
import {ApiAdminService} from "../../../services/api-admin.service";
import {ActivatedRoute} from "@angular/router";
import {AlertController, LoadingController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.page.html',
  styleUrls: ['./artist-detail.page.scss'],
})
export class ArtistDetailPage implements OnInit {
  artistId: any;
  form: FormGroup;
  artist: ArtistModel;

  constructor(
    private apiAdmin: ApiAdminService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {

      if (!paramMap.has('artistId')) {
        this.navCtrl.navigateBack('/admin/tabs/artists');
        return;
      }

      this.artistId = paramMap.get('artistId');
    });

    this.apiAdmin.fetchArtistById(this.artistId);
    this.apiAdmin.artist.subscribe(artist => this.artist = artist);
  }

  onUpdateEmail() {
    this.alertCtrl.create({
      header: 'Update email',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'New email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: (alertData) => {
            this.loadingCtrl.create({
              message: 'Updating email'
            }).then(loadingEl => {
              loadingEl.present();

              setTimeout(() => {
                loadingEl.dismiss();

                let artistModel = new ArtistModel();
                artistModel.email = alertData.email;
                artistModel.id = this.artistId;

                this.apiAdmin.updateArtist(artistModel).subscribe();
              }, 1500);
            });

          }
        }
      ]
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
