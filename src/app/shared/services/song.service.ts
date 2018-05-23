import { Injectable } from '@angular/core';


import {Observable} from 'rxjs/Observable';
import {Song} from '../model/song';
import {SongLyric} from '../model/song-lyric';
import {UserSongLyric} from '../model/user-song-lyric';

import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {SLHHttpClient} from '../web/HttpClient';
import {HttpErrorResponse} from '@angular/common/http';
declare var _: any;
declare var $: any;

@Injectable()
export class SongService {

  actionUrl: string;

  constructor(
    private _http: SLHHttpClient,
  ) {
    this.actionUrl = 'https://setlisthelper.azurewebsites.net/api/v2.0/Song';
  }

  getSongCount() {
    return this._http.get(this.actionUrl + '?action=count')
      .take(1);
  }

  findAllSongs(startIndex, numberOfSongsToGet): Observable<Song[]> {
    return this._http.get(this.actionUrl + `?start=${startIndex}&records=${numberOfSongsToGet}`)
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

  getSong(songId: string): Observable<any> {
    return this._http.get(this.actionUrl + `?id=${songId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateSong(songId: number, song: Song) {
    song.LastEdit = new Date().toISOString();
    song.SongId = songId;
    const songJson = Song.toJson(song);
    return this._http.put(this.actionUrl, songJson)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Returns the song key
  createSong(song: Song): Observable<any> {
    song.LastEdit = new Date().toISOString();
    song.SongId = -1;
    const songJson = Song.toJson(song);
    return this._http.post(this.actionUrl, songJson)
      .pipe(
        catchError(this.handleError)
      );
  }

  /*getSongsNotInSetlist(songIds, songToSearchFor, accountId) {
    this.db.list(`/songs`, {
      query: {
        orderByChild: 'Name'
      }
    })
      .map((songs) => {
        return songs.filter(song => song.uid === accountId && !_.includes(songIds, song.$key)
        && song.Name.toLowerCase().indexOf(songToSearchFor) !== -1)
          .map((song) => {
            return song;
          });
      });
  }

  //Returns the song key
  createSongIfItDoesNotExist(song: Song) {
    this.findSongByName(song.Name)
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

  updateSong(SongKey: string, song: Song) {
    const song$ = this.db.object('/songs/' + SongKey);
    const songToUpdate = _.clone(song, true);
    this.artistService.createArtistIfItDoesNotExist(SongKey, song.accountId, song.ArtistName);
    this.genreService.createGenreIfItDoesNotExist(SongKey, song.accountId, song.GenreName);
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



  findSongByName(Name: string) {
    return this.db.list('songs', {
      query: {
        orderByChild: 'Name',
        equalTo: Name
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

  loadNextPage(SongKey: string, pageSize: number): Observable<Song[]> {

    return this.db.list('songs', {
      query: {
        orderByKey: true,
        startAt: SongKey,
        limitToFirst: pageSize + 1
      }
    })
      .map(songs => songs.slice(1, songs.length));
  }

  loadPreviousPage(SongKey: string, pageSize: number): Observable<Song[]> {

    return this.db.list('songs', {
      query: {
        orderByKey: true,
        endAt: SongKey,
        limitToLast: pageSize + 1
      }
    })
      .map(songs => songs.slice(0, songs.length - 1));
  }*/



}
