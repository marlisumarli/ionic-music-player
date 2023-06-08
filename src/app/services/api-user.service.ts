import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, switchMap, take, tap} from "rxjs";
import {SongModel} from "../model/song.model";
import {ArtistModel} from "../model/artist.model";
import {environment} from "../../environments/environment";
import {AlbumModel} from "../model/album.model";
import {UserModel} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  private _songs = new BehaviorSubject<SongModel[]>([]);
  private _artists = new BehaviorSubject<ArtistModel[]>([]);
  private _album = new BehaviorSubject<AlbumModel>(new AlbumModel());
  private _albums = new BehaviorSubject<AlbumModel[]>([]);
  private _artist = new BehaviorSubject<ArtistModel>(new ArtistModel());
  private _likeSongs = new BehaviorSubject<SongModel[]>([]);

  get songs() {
    return this._songs.asObservable();
  }

  get artists() {
    return this._artists.asObservable();
  }

  get album() {
    return this._album.asObservable();
  }

  get albums() {
    return this._albums.asObservable();
  }

  get artist() {
    return this._artist.asObservable();
  }

  get likeSongs() {
    return this._likeSongs.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
  }

  fetchUserById(id: string) {
    return this.http.get(environment.ApiURL + '/user/' + id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        // const artist = new ArtistModel();
        // artist.id = resData.data.id;
        // artist.fullName = resData.data.name;
        // artist.bio = resData.data.bio;
        // artist.image = resData.data.image;
        // this._artist.next(artist);
        console.log(resData);
      });
  }

  updateProfile(user: UserModel) {
    return this.http.put(environment.ApiURL + '/user', {
      name: user.fullName,
      email: user.email,
      birthday: user.email
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        console.log(resData);
      });
  }

  fetchHome() {
    return this.http.get(environment.ApiURL + '/user/home', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        const songs: SongModel[] = [];
        for (let song of resData.data) {
          let songModel = new SongModel();
          songModel.id = song.id;
          songModel.title = song.title;
          songModel.url = song.audioUrl;
          songModel.likeCount = song.likes;
          songModel.albumImage = song.album.image;
          songModel.artistId = song.artist.id;
          songModel.artistName = song.artist.fullName;
          songModel.isLike = song.isLike;
          songs.push(songModel);
        }
        this._songs.next(songs);
      });
  }

  fetchPlaylist() {
    return this.http.get(environment.ApiURL + '/user/songs/like', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        const songs = [];
        for (let song of resData.data) {
          const songModel = new SongModel();
          songModel.id = song.id;
          songModel.title = song.title;
          songModel.url = song.audioUrl;
          songModel.albumId = song.album.id;
          songModel.likeCount = song.likes;
          songModel.albumImage = song.album.image;
          songModel.artistId = song.artist.id;
          songModel.artistName = song.artist.fullName;
          songModel.isLike = song.isLike;
          songs.push(songModel);
        }
        this._likeSongs.next(songs);
      });
  }

  fetchAlbumByArtistIdAlbumId(artistId: any, albumId: any) {
    return this.http.get(environment.ApiURL + '/user/artists/' + artistId + '/albums/' + albumId + '.json', {})
      .subscribe((resData: any) => {
        const albumModel = new AlbumModel();
        albumModel.id = resData.album_id;
        albumModel.image = resData.album_image;
        albumModel.title = resData.album_title;
        albumModel.publishDate = resData.publish_date;

        const songs = [];
        for (let song of resData.songs) {
          let songModel = new SongModel();
          songModel.id = song.song_id;
          songModel.title = song.song_title;
          songModel.url = song.song_url;
          songModel.releaseDate = song.release_date;
          songModel.isLike = song.isLike;
          songModel.userId = song.playlist.user_id;
          songs.push(songModel);
        }
        this._album.next(albumModel);
        this._songs.next(songs);
      });
  }

  fetchArtistById(artistId: any) {
    return this.http.get(environment.ApiURL + '/user/artists/' + artistId + '.json', {})
      .subscribe((resData: any) => {
        const albums = [];

        const artistModel = new ArtistModel();
        artistModel.id = resData.artist_id;
        artistModel.image = resData.artist_image;
        artistModel.fullName = resData.artist_name;
        artistModel.bio = resData.bio;

        for (let album of resData.albums) {
          const albumModel = new AlbumModel();
          albumModel.id = album.album_id;
          albumModel.image = album.album_image;
          albumModel.title = album.album_title;
          albumModel.publishDate = album.publish_date;
          albums.push(albumModel);
        }
        this._artist.next(artistModel);
        this._albums.next(albums);
      });
  }

  favoriteSong(songId: any, are: any) {
    return this.http.post(environment.ApiURL + `/user/${are}/${songId}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(
      switchMap(() => {
        return this.likeSongs;
      }),
      take(1),
      tap(songs => {
        this._likeSongs.next(songs.filter(song => song.id !== songId));
      })
    );
  }

  fetchSearch(query: string) {
    return this.http.get(environment.ApiURL + `/user/search?q=${query}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        const songs = [];
        const artists = [];
        for (let song of resData.data.songs) {
          const songModel = new SongModel();
          songModel.id = song.id;
          songModel.title = song.title;
          songModel.url = song.audioUrl;
          songModel.albumId = song.album.id;
          songModel.likeCount = song.likes;
          songModel.albumImage = song.album.image;
          songModel.artistId = song.artist.id;
          songModel.artistName = song.artist.fullName;
          songModel.isLike = song.isLike;
          songs.push(songModel);
        }
        for (let artist of resData.data.artists) {
          const artistModel = new ArtistModel();
          artistModel.id = artist.id;
          artistModel.fullName = artist.full_name;
          artistModel.image = artist.image;
          artistModel.bio = artist.bio;
          artists.push(artistModel);
        }
        this._songs.next(songs);
        this._artists.next(artists);
      });
  }
}
