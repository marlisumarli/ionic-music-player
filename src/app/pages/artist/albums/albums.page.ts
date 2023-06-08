import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AlbumModel} from "../../../model/album.model";
import {SongModel} from "../../../model/song.model";
import {ApiArtistService} from "../../../services/api-artist.service";
import {NewAlbumComponent} from "../new-album/new-album.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {
  loadedAlbums: AlbumModel[];
  loadedSongs: SongModel[];
  private songSubs: Subscription;
  private albumSubs: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private apiArtist: ApiArtistService
  ) {
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.apiArtist.fetchAllAlbums();
    this.albumSubs = this.apiArtist.albums.subscribe(albums => this.loadedAlbums = albums);
    this.songSubs = this.apiArtist.songs.subscribe(songs => this.loadedSongs = songs);
  }

  durationHelper(second: any) {
    let minute: number = Math.floor(second / 60);
    let secondLeft: number = second % 60;
    return minute + ":" + (secondLeft < 10 ? "0" : "") + secondLeft;
  }

  onCreateAlbum() {
    this.modalCtrl.create({
      component: NewAlbumComponent
    }).then(modalEl => {
      modalEl.present();
    });
  }

  ngOnDestroy() {
    if (this.albumSubs) {
      this.albumSubs.unsubscribe();
    }
    if (this.songSubs) {
      this.songSubs.unsubscribe();
    }
  }

}
