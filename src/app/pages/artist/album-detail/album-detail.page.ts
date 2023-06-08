import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, NavController} from "@ionic/angular";
import {AlbumModel} from "../../../model/album.model";
import {ActivatedRoute} from "@angular/router";
import {SongModel} from "../../../model/song.model";
import {ApiArtistService} from "../../../services/api-artist.service";
import {RequestSongComponent} from "../request-song/request-song.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.page.html',
  styleUrls: ['./album-detail.page.scss'],
})
export class AlbumDetailPage implements OnInit {
  album: AlbumModel;
  loadedSongs: SongModel[];
  private songSubs: Subscription;

  constructor(
    private apiArtist: ApiArtistService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.activatedRoute.paramMap.subscribe(paramMap => {

      if (!paramMap.has('albumId')) {
        this.navCtrl.navigateBack('/artist/tabs/albums');
        return;
      }

      this.apiArtist.fetchAlbumById(paramMap.get('albumId'));
    });

    this.apiArtist.album.subscribe(album => this.album = album);
    this.songSubs = this.apiArtist.songs.subscribe(songs => this.loadedSongs = songs);
  }

  onCreateSong() {
    this.modalCtrl.create({
      component: RequestSongComponent,
      componentProps: {album: this.album}
    }).then(modalEl => {
      modalEl.present();
    });
  }

  onDeleteAlbum() {
    this.loadingCtrl.create({
      message: 'Deleting user'
    }).then(loadingEl => {
      loadingEl.present();

      setTimeout(() => {
        loadingEl.dismiss();

        this.apiArtist.deleteAlbum(this.album.id).subscribe();

        this.navCtrl.navigateBack('/artist/tabs/albums');
      }, 1500);
    });
  }

  ngOnDestroy() {
    if (this.songSubs) {
      this.songSubs.unsubscribe();
    }
  }
}
