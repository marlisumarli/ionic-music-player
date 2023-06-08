import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {SongModel} from "../../../model/song.model";
import {ApiArtistService} from "../../../services/api-artist.service";
import {Howl} from "howler";

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  song: SongModel;
  songId: any;
  albumId: any;
  isPlaying: boolean = false;
  progressBar: number;
  start: number = 0;
  end: number = 0;
  progressInterval: any;
  howler: Howl;

  constructor(
    private apiArtist: ApiArtistService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('songId')) {
        this.navCtrl.navigateBack('/artist/tabs/albums');
        return;
      }
      this.albumId = paramMap.get('albumId');
      this.songId = paramMap.get('songId');
    });
    this.apiArtist.fetchSongById(this.albumId, this.songId);
    this.apiArtist.song.subscribe(songs => this.song = songs);
  }

  durationHelper(second: any) {
    let minute: number = Math.floor(second / 60);
    let secondLeft: number = second % 60;
    return minute + ":" + (secondLeft < 10 ? "0" : "") + secondLeft;
  }

  onPlayer() {
    this.howler = new Howl({
      src: [this.song.url],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.start = Math.round(this.howler.seek());
        this.end = Math.round(this.howler.duration());
        this.startProgressInterval();
      },
      onend: () => {
        this.isPlaying = false;
        this.stopProgressInterval();
      }
    });
    this.howler.play();
  }

  seekTo(event: any) {
    const seekTo = (event.target.value / 100) * this.howler.duration();
    this.start = Math.round(seekTo);
    this.howler.seek(seekTo);
  }

  togglePlayer(pause: boolean) {
    this.isPlaying = !pause;
    if (pause) {
      this.howler.pause();
    } else {
      this.onPlayer();
      this.howler.play();
    }
  }

  startProgressInterval() {
    this.progressInterval = setInterval(() => {
      const seek = this.howler.seek() || 0;
      this.start = Math.round(seek);
      this.progressBar = seek / this.howler.duration() * 100
    }, 1);
  }

  stopProgressInterval() {
    clearInterval(this.progressInterval);
  }

  ngOnDestroy() {
    if (this.howler) {
      this.howler.stop();
    }
  }
}
