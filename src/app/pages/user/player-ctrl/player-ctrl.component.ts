import {Component, OnInit} from '@angular/core';
import {HowlService} from "../../../services/howl.service";
import {SongModel} from "../../../model/song.model";
import {ApiUserService} from "../../../services/api-user.service";

@Component({
  selector: 'app-player-ctrl',
  templateUrl: './player-ctrl.component.html',
  styleUrls: ['./player-ctrl.component.scss'],
})
export class PlayerCtrlComponent implements OnInit {
  activeSong: SongModel;
  isPlaying: boolean;
  progressBar: number;
  start: number;
  end: number;
  isLiked: boolean;

  constructor(
    private howler: HowlService,
    private apiUser: ApiUserService
  ) {
  }

  ngOnInit() {
    this.howler.activeSong.subscribe(activeSong => this.activeSong = activeSong);
    this.howler.progressBar.subscribe(progressBar => this.progressBar = progressBar);
    this.howler.isPlaying.subscribe(isPlaying => this.isPlaying = isPlaying);
    this.howler.start.subscribe(start => this.start = start);
    this.howler.end.subscribe(end => this.end = end);
    this.howler.isLiked.subscribe(isLike => this.isLiked = isLike);

    this.isLiked = this.activeSong?.isLike;
  }

  durationHelper(second: any) {
    let minute: number = Math.floor(second / 60);
    let secondLeft: number = second % 60;
    return minute + ":" + (secondLeft < 10 ? "0" : "") + secondLeft;
  }

  onPlayer(pause: boolean) {
    this.howler.togglePlayer(pause);
    this.isPlaying = !this.isPlaying;
  }

  onSeek(event: any) {
    this.howler.seekTo(event);
  }

  onNext() {
    this.howler.next();
  }

  onPrevious() {
    this.howler.previous();
  }

  onLikeToggle(are: string) {
    this.apiUser.favoriteSong(this.activeSong.id, are).subscribe();
    this.isLiked = !this.isLiked;
    this.activeSong.isLike = this.isLiked;
  }
}
