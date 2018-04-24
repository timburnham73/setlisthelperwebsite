import { Injectable } from '@angular/core';


import {Observable} from 'rxjs/Observable';
import {Song} from '../model/song';
import {SongLyric} from '../model/song-lyric';
import {UserSongLyric} from '../model/user-song-lyric';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
declare var _: any;
declare var $: any;

@Injectable()
export class SongService {

  actionUrl: string;

  constructor(
    private _http: HttpClient,
  ) {
    this.actionUrl = 'https://setlisthelper.azurewebsites.net/api/v2.0/Song';
  }

  getAuthTokenInfo() {
    const jwt = localStorage.getItem('authToken');
    let httpOptions;
    if (jwt) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
          'Authorization':  'Bearer ' + jwt,
        })
      };
    }
    return httpOptions;
  }

  getSongCount() {
    const options = this.getAuthTokenInfo();
    return this._http.get(this.actionUrl + '?action=count', options)
      .take(1);
  }

  findAllSongs(startIndex, numberOfSongsToGet): Observable<Song[]> {
    const options = this.getAuthTokenInfo();
    return this._http.get<Song[]>(this.actionUrl + `?start=${startIndex}&records=${numberOfSongsToGet}`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
  /*addSongLyric(songLyric:SongLyric){
    delete songLyric.$key;
    return this.db.list('songLyrics').push(songLyric).key;
  }*/

  setDefaultSongLyric(songLyric: SongLyric, userId: string) {

  }

  /*getSongLyrics(songId: string, userId: string) {

  }*/

  getSong(songId: string): Observable<Song> {
    const options = this.getAuthTokenInfo();
    return this._http.get<Song[]>(this.actionUrl + `?id=${songId}`, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*getSongsNotInSetlist(songIds, songToSearchFor, accountId) {
    this.db.list(`/songs`, {
      query: {
        orderByChild: 'name'
      }
    })
      .map((songs) => {
        return songs.filter(song => song.uid === accountId && !_.includes(songIds, song.$key)
        && song.name.toLowerCase().indexOf(songToSearchFor) !== -1)
          .map((song) => {
            return song;
          });
      });
  }

  //Returns the song key
  createSong(song: Song): string {
    const songKey = this.db.list('songs').push(song).key;
    this.artistService.createArtistIfItDoesNotExist(songKey, song.accountId, song.artist);
    this.genreService.createGenreIfItDoesNotExist(songKey, song.accountId, song.genre);
    return songKey;
  }

  //Returns the song key
  createSongIfItDoesNotExist(song: Song) {
    this.findSongByName(song.name)
      .take(1)
      .subscribe(
      (result) => {
        if (_.size(result) === 0) {
          this.db.list('songs').push(song).key;
        }
      }
    );
  }

  addUserSongLyric(userSongLyric: UserSongLyric) {
    const userSongLyricForAdd = _.clone(userSongLyric, true);
    delete userSongLyricForAdd.$key;
    return this.db.list('userSongLyrics').push(userSongLyricForAdd);
  }

  updateSongLyric(songLyric: SongLyric) {
    const songLyricKey = _.clone(songLyric.$key);
    const songLyricForUpdate = _.clone(songLyric, true);
    const songLyric$ = this.db.list('/songLyrics');
    delete songLyricForUpdate.$key;
    return songLyric$.update(songLyricKey, songLyricForUpdate);
  }

  updateSong(songKey: string, song: Song) {
    const song$ = this.db.object('/songs/' + songKey);
    const songToUpdate = _.clone(song, true);
    this.artistService.createArtistIfItDoesNotExist(songKey, song.accountId, song.artist);
    this.genreService.createGenreIfItDoesNotExist(songKey, song.accountId, song.genre);
    delete songToUpdate.$key;
    return song$.update(songToUpdate);
  }

  updateUserSongLyrics(userSongLyric: UserSongLyric) {
    const userSongLyric$ = this.db.list('/userSongLyrics');
    const userSongLyricKey = _.clone(userSongLyric.$key);
    delete userSongLyric.$key;
    return userSongLyric$.update(userSongLyricKey, userSongLyric);
  }

  removeSong(song) {
    return this.db.list('/songs').remove(song.$key);
  }



  findSongByName(name: string) {
    return this.db.list('songs', {
      query: {
        orderByChild: 'name',
        equalTo: name
      }
    }).map(Song.fromJsonArray)
      .take(1);
  }

  loadFirstSongsPage(pageSize: number): Observable<Song[]> {

    return this.db.list('songs', {
      query: {
        orderByKey: true,
        limitToFirst: pageSize
      }})
      .map(Song.fromJsonArray);
  }

  loadNextPage(songKey: string, pageSize: number): Observable<Song[]> {

    return this.db.list('songs', {
      query: {
        orderByKey: true,
        startAt: songKey,
        limitToFirst: pageSize + 1
      }
    })
      .map(songs => songs.slice(1, songs.length));
  }

  loadPreviousPage(songKey: string, pageSize: number): Observable<Song[]> {

    return this.db.list('songs', {
      query: {
        orderByKey: true,
        endAt: songKey,
        limitToLast: pageSize + 1
      }
    })
      .map(songs => songs.slice(0, songs.length - 1));
  }*/



}
