import {Component, OnInit} from '@angular/core';
import {ApiAdminService} from "../../../services/api-admin.service";
import {ArtistModel} from "../../../model/artist.model";
import {ModalController} from "@ionic/angular";
import {NewArtistComponent} from "../new-artist/new-artist.component";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.page.html',
  styleUrls: ['./artist-list.page.scss'],
})
export class ArtistListPage implements OnInit {
  artists: ArtistModel[];

  constructor(
    private apiAdmin: ApiAdminService,
    private modalCtrl: ModalController
  ) {

  }

  ngOnInit() {
    this.apiAdmin.fetchAllArtists();
    this.apiAdmin.artists.subscribe(artists => this.artists = artists);
  }

  onAddButton() {
    this.modalCtrl
      .create({
        component: NewArtistComponent
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
  }

}
