import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {HowlService} from "../../../services/howl.service";
import {SongModel} from "../../../model/song.model";
import {AlbumModel} from "../../../model/album.model";
import {ArtistModel} from "../../../model/artist.model";
import {ApiUserService} from "../../../services/api-user.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  album: AlbumModel;
  songs: SongModel[];
  artist: ArtistModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private apiUser: ApiUserService,
    private howler: HowlService
  ) {
    setInterval(() => {
      console.log(this.songs)
    }, 1000);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('albumId')) {
        this.navCtrl.navigateBack('/user/tabs/home');
        return;
      }
      let albumId = paramMap.get('albumId');
      let artistId = paramMap.get('artistId');
      this.apiUser.fetchAlbumByArtistIdAlbumId(artistId, albumId);
    });

    this.apiUser.album.subscribe(album => this.album = album);
    this.apiUser.songs.subscribe(song => this.songs = song);
    this.apiUser.artist.subscribe(artist => this.artist = artist);
  }

  onAddToQueue(song: SongModel) {
    // const arr = [...song];
    // const index = arr.findIndex((item: any) => item.id === song.id);
    // arr.splice(index, 1);
    // arr.unshift(song);

    this.howler.playSong(song);
  }
}
