import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/delay'

/*
  Generated class for the MusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MusicProvider {

  public favoriteSongs = [];
  private _url = 'http://orangevalleycaa.org/api/music';

  constructor(public _httpClient: HttpClient) {
    console.log("Hello MusicProvider Provider")
  }

  getMusic(): Observable<any[]> {
    return this._httpClient
      .get<any[]>(this._url).delay(5000)
      .do(data => console.log('Do: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return Observable.throw(error.message);
  }

  addToFavorites(song) {
    let isSongAdded = this.favoriteSongs.findIndex((favoriteSong) => {
      return song.id === favoriteSong.id
    });
    if (isSongAdded === -1) {
      this.favoriteSongs.push(song);
    }
  }

  getFavorites() {
    return this.favoriteSongs;
  }
}
