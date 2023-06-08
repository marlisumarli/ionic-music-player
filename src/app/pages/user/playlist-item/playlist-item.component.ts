import {Component, Input, OnInit} from '@angular/core';
import {HowlService} from "../../../services/howl.service";
import {SongModel} from "../../../model/song.model";

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {
  @Input() song: SongModel;

  activeSong: SongModel;

  constructor(
    private howler: HowlService
  ) {
  }

  ngOnInit() {
    this.howler.activeSong.subscribe(song => this.activeSong = song);

  }

  onAddToQueue(song: SongModel) {
    this.howler.playSong(song);
  }
}
