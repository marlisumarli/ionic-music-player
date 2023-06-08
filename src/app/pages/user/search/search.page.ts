import {Component, OnInit} from '@angular/core';
import {ApiUserService} from "../../../services/api-user.service";
import {SongModel} from "../../../model/song.model";
import {ArtistModel} from "../../../model/artist.model";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  songs: SongModel[];
  artists: ArtistModel[];

  constructor(
    private apiUser: ApiUserService
  ) {
  }

  ngOnInit() {
  }

  onSearch(event: any) {
    if (event.target.value) {
      this.apiUser.fetchSearch(event.target.value);
      this.apiUser.songs.subscribe(songs => this.songs = songs);
      this.apiUser.artists.subscribe(artists => this.artists = artists);
    }
  }
}
