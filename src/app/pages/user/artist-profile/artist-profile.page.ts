import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {ArtistModel} from "../../../model/artist.model";
import {AlbumModel} from "../../../model/album.model";
import {ApiUserService} from "../../../services/api-user.service";

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.page.html',
  styleUrls: ['./artist-profile.page.scss'],
})
export class ArtistProfilePage implements OnInit {
  artist: ArtistModel;
  albums: AlbumModel[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private apiUser: ApiUserService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {

      if (!paramMap.has('artistId')) {
        this.navCtrl.navigateBack('/user/tabs/home');
        return;
      }
      this.apiUser.fetchArtistById(paramMap.get('artistId'));
    });

    this.apiUser.artist.subscribe(artist => this.artist = artist);
    this.apiUser.albums.subscribe(albums => this.albums = albums);
  }

}
