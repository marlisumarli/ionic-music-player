import {Injectable} from '@angular/core';
import {BehaviorSubject, switchMap, take, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserModel} from "../model/user.model";
import {ArtistModel} from "../model/artist.model";
import {SongModel} from "../model/song.model";

@Injectable({
  providedIn: 'root'
})
export class ApiAdminService {
  private _data = new BehaviorSubject<any>({});
  private _users = new BehaviorSubject<UserModel[]>([]);
  private _user = new BehaviorSubject<UserModel>(new UserModel());
  private _artists = new BehaviorSubject<ArtistModel[]>([]);
  private _artist = new BehaviorSubject<ArtistModel>(new ArtistModel());
  private _pendingSongs = new BehaviorSubject<SongModel[]>([]);

  get data() {
    return this._data.asObservable();
  }

  get users() {
    return this._users.asObservable();
  }

  get user() {
    return this._user.asObservable();
  }

  get artists() {
    return this._artists.asObservable();
  }

  get artist() {
    return this._artist.asObservable();
  }

  get pendingSongs() {
    return this._pendingSongs.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
  }

  fetchDataDashboard() {
    return this.http.get(environment.ApiURL + '/admin/dashboard', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        this._data.next(resData.data);
      });
  }

  fetchAllUsers() {
    return this.http.get(environment.ApiURL + '/admin/users', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        let users: UserModel[] = [];
        for (let user of resData.data) {
          if (user.role === 'User') {
            let userModel = new UserModel();
            userModel.id = user.id;
            userModel.email = user.email;
            userModel.fullName = user.name;
            userModel.registeredAt = new Date(user.created_at).toLocaleDateString();
            users.push(userModel);
          }
        }
        this._users.next(users);
        console.log(resData)
      });
  }

  fetchUserById(userId: string) {
    return this.http.get(environment.ApiURL + `/admin/users/${userId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        let userModel = new UserModel();
        userModel.id = resData.id;
        userModel.email = resData.email;
        userModel.password = resData.password;
        this._user.next(userModel);
      });
  }

  createUser(user: UserModel) {
    return this.http.post(environment.ApiURL + '/admin/users', {
      name: user.fullName,
      email: user.email,
      password: user.password,
      birthday: '2023-05-05',
      role: 'user'
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .pipe(switchMap(() => {
          return this.users
        }), take(1), tap(users => {
          this._users.next(users.concat(user));
        })
      );
  }

  updateUser(user: UserModel) {
    return this.http.patch(environment.ApiURL + `/admin/users/${user.id}`, {
      email: user.email,
      password: user.password
    })
      .pipe(
        switchMap(resData => {
          console.log(resData);
          return this.users
        }),
        take(1),
        tap(users => {
          this._users.next(users.map(u => u.id !== user.id ? u : user));
        })
      );
  }

  deleteUser(userId: string) {
    return this.http.delete(environment.ApiURL + `/admin/users/${userId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).pipe(switchMap(() => {
        return this.users
      }), take(1), tap(users => {
        this._users.next(users.filter(user => user.id !== userId));
      })
    );
  }

  fetchAllArtists() {
    return this.http.get(environment.ApiURL + '/admin/users', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        let artists: ArtistModel[] = [];
        for (let artist of resData.data) {
          if (artist.role === "Artist") {
            let userModel = new ArtistModel();
            userModel.id = artist.id;
            userModel.email = artist.email;
            userModel.fullName = artist.name;
            userModel.registeredAt = new Date(artist.created_at).toLocaleDateString();
            artists.push(userModel);
          }
        }
        this._artists.next(artists);
      });
  }

  fetchArtistById(artistId: string) {
    return this.http.get(environment.ApiURL + `/admin/artists/${artistId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        let artistModel = new ArtistModel();
        artistModel.id = artistId;
        artistModel.email = resData.email;
        artistModel.password = resData.password;
        artistModel.fullName = resData.name;
        this._artist.next(artistModel);
      });
  }

  createArtist(artist: ArtistModel) {
    return this.http.post(environment.ApiURL + '/artists.json', {
      artist_email: artist.email,
      password: artist.password,
      full_name: artist.fullName,
      registered_at: artist.registeredAt,
      bio: artist.bio,
      artist_id: artist.id
    }).pipe(
      switchMap(resData => {
        console.log(resData);
        return this.artists
      }),
      take(1),
      tap(artists => {
        this._artists.next(artists.concat(artist));
      })
    );
  }

  updateArtist(artist: ArtistModel) {
    return this.http.patch(environment.ApiURL + '/artists/' + artist.id + '.json', {
      artist_email: artist.email,
      password: artist.password,
      bio: artist.bio,
    })
      .pipe(
        switchMap(() => {
          return this.artists
        }),
        take(1),
        tap(artists => {
          this._artists.next(artists.map(a => a.id !== artist.id ? a : artist));
        })
      );
  }

  fetchAllAdmin() {
    return this.http.get(environment.ApiURL + '/admin/users', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        let users: UserModel[] = [];
        for (let user of resData.data) {
          if (user.role === 'Admin') {
            let userModel = new UserModel();
            userModel.id = user.id;
            userModel.email = user.email;
            userModel.fullName = user.name;
            userModel.registeredAt = new Date(user.created_at).toLocaleDateString();
            users.push(userModel);
          }
        }
        this._users.next(users);
      });
  }

  fetchPendingSongs() {
    return this.http.get(environment.ApiURL + '/admin/pending', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .subscribe((resData: any) => {
        let songs: SongModel[] = [];
        for (let song of resData.data) {
          let songModel = new SongModel();
          songModel.id = song.id;
          songModel.title = song.title;
          songModel.artistName = song.album.artist.fullName;
          songModel.status = song.status;
          songModel.albumTitle = song.album.title;
          songs.push(songModel);
        }
        this._pendingSongs.next(songs);
      });
  }

  songApprovals(songId: string, status: string) {
    return this.http.post(environment.ApiURL + `/admin/${status}/${songId}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .pipe(
        switchMap(() => {
          return this.pendingSongs
        }),
        take(1),
        tap(songs => {
          this._pendingSongs.next(songs.filter(song => song.id !== songId));
        })
      );
  }
}
