import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _data = new BehaviorSubject<any>('');

  get data() {
    return this._data.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
  }

  login(email: string, password: string) {
    return this.http.post(environment.ApiURL + '/auth',
      {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe((resData: any) => {
      this._data.next(resData);
    });
  }

  loginArtist(email: string, password: string) {
    return this.http.post(environment.ApiURL + '/artist-auth',
      {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe((resData: any) => {
      this._data.next(resData);
    });
  }

  registerUser(name: string, email: string, password: string) {
    return this.http.post(environment.ApiURL + '/register',
      {
        fullName: name,
        email: email,
        password: password,
        role: 'user'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe()
  }

  registerArtist(formData: FormData) {
    return this.http.post(environment.ApiURL + '/artist-register', formData).subscribe();
  }
}
