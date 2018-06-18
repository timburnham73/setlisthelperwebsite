import { Injectable } from '@angular/core';
import {Setlist} from '../model/setlist';
import {SongService} from './song.service';
import {SetlistSong} from '../model/setlist-song';
import {SLHHttpClient} from '../web/HttpClient';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {HttpErrorResponse} from '@angular/common/http';
import {Song} from '../model/song';
import set = Reflect.set;

declare var _: any;
declare var $: any;

@Injectable()
export class SetlistService {
  actionUrl: string;
  setlistSongUrl: string;
  constructor(
    private _http: SLHHttpClient,
    private songService: SongService) {
    this.setlistSongUrl = 'https://setlisthelper.azurewebsites.net/api/v2.0/SetlistSong';
    this.actionUrl = 'https://setlisthelper.azurewebsites.net/api/v2.0/Setlist';
  }

  findAllSetlists(): Observable<Setlist[]> {
    return this._http.get(this.actionUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSetlist(setlistId: string): Observable<Setlist> {
    return this._http.get(this.actionUrl + `?id=${setlistId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  //Returns the setlist key
  createSetlist(setlist: Setlist): Observable<Setlist> {
    setlist.lastEdit = new Date().toISOString();
    setlist.setlistId = -1;
    const setlistJson = Setlist.toJson(setlist);
    return this._http.post(this.actionUrl, setlistJson)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateSetlist(setlistId: number, setlist: Setlist) {
    setlist.lastEdit = new Date().toISOString();
    setlist.setlistId = setlistId;
    const setlistJson = Setlist.toJson(setlist);
    return this._http.put(this.actionUrl, setlistJson)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteSetlist(setlist: Setlist): Observable<string> {
    const setlistId = setlist.setlistId;
    return this._http.delete(this.actionUrl + `?id=${setlistId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  duplicateSetlist(setlist: Setlist): Observable<Setlist> {
    setlist.name += ' copy';
    return this.createSetlist(setlist);
  }

  /*getSetlistSongs(setlistId: string) {
    let setlistSongsReturn = [];
    return this.db.list(`/setlistSongs/`, {
      query: {
        orderByChild: 'setlistId',
        equalTo: setlistId
      }
    })
      .map(setlistSongs => _.sortBy(setlistSongs, (song) => song.sequenceNumber ))
      .flatMap(setlistSongs => {//get all the song ids. Create observables to the song object. CombineLatest and Flatmap to get the actual song

        if (_.size(setlistSongs) === 0) {
          return Observable.empty();
        }

        setlistSongsReturn = _.values(setlistSongs);
        return Observable.combineLatest( _.flatMap(setlistSongs, song => this.db.object(`/songs/${song.songId}`)));
      })
      .map(songs => {//Now that we have the actual song combine the setlist song with the song.
        _.each(setlistSongsReturn, function(setlistSong) {
          const foundSong = _.find(songs, function(song) {
            return song.$key === setlistSong.songId;
          });
          if (_.isUndefined(foundSong) === false) {//Don't merge breaks
            delete foundSong.$key; //delete the key of the song so the $key of the setlist song is retained.
            _.merge(setlistSong, foundSong);
          }
        });
        return setlistSongsReturn;
      })
      .map(SetlistSong.fromJsonArray); //Map the setlist song to the object Setlist song

  }*/

  /*getSongsForSetlist(setlistId: string, accountId: string, songToSearchFor: string, filterSongsInSetlist: boolean) {
    return this.getSetlistSongkeys(setlistId)
      .switchMap(songIds => {
        return this.songService.findAllSongs()
          .map((songs) => {
            return songs.filter(song => !_.includes(songIds, song.$key)
            && song.name.toLowerCase().indexOf(songToSearchFor) !== -1)
              .map((song) => {
                return song;
              });
          });
      });
  }


  addSongToSetlist(setlistId: string, setlistSong: SetlistSong) {

      return this.db.list(`/setlistSongs` )
        .push({
          displaySequenceNumber: setlistSong.displaySequenceNumber,
          sequenceNumber: setlistSong.sequenceNumber,
          songId: setlistSong.songId,
          setlistId: setlistId,
          isBreak: false
        }).key;

  }

  addSongBreak(setlistId: string, sequenceNumber: number, displaySequenceNumber) {

      return this.db.list(`/setlistSongs` )
        .push({
          displaySequenceNumber: displaySequenceNumber,
          sequenceNumber: sequenceNumber,
          songId: '',
          setlistId : setlistId,
          isBreak: true
        }).key;

  }

  updateSetlistSong(setlistKey: string, setlistSong: SetlistSong) {
    const setlistSongs$ = this.db.object(`/setlistSongs/${setlistSong.$key}`);
    return setlistSongs$.update({
      sequenceNumber: setlistSong.sequenceNumber,
      displaySequenceNumber: setlistSong.displaySequenceNumber
    });
  }

  removeSetlistSong(setlistKey: string, setlistSong: SetlistSong) {
    const setlistSongs$ = this.db.object(`/setlistSongs/${setlistSong.$key}`);
    return setlistSongs$.remove();
  }*/

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

}