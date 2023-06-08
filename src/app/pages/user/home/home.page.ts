import {Component, OnInit} from '@angular/core';

import {register} from 'swiper/element/bundle';
import {HowlService} from "../../../services/howl.service";
import {SongModel} from "../../../model/song.model";
import {ArtistModel} from "../../../model/artist.model";
import {ApiUserService} from "../../../services/api-user.service";

register();

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  songs: SongModel[];
  artists: ArtistModel[];
  activeSong: SongModel;
  index: any;

  constructor(
    private howler: HowlService,
    private apiUser: ApiUserService
  ) {
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.apiUser.fetchHome();
    this.howler.activeSong.subscribe(activeSong => this.activeSong = activeSong);
    this.apiUser.artists.subscribe(artists => this.artists = artists);
    this.apiUser.songs.subscribe(songs => this.songs = songs);
  }

  onAddToQueue(song: SongModel) {

    const arr = [...this.songs];
    const index = arr.findIndex((item: any) => item.id === song.id);
    arr.splice(index, 1);
    arr.unshift(song);
    this.howler.setCurrentIndex(0);
    this.howler.setTracks(arr);
    this.howler.playSong(song);
  }
}
