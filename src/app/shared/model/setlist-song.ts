
import {Song} from './song';

declare var _: any;
declare var $: any;

export class SetlistSong extends Song {
  public setlistSongId: number;
  public sequenceNumber: number;
  public displaySequenceNumber: number;
  public songId: number;
  public setlistId: number;
  public isBreak: boolean;


  constructor(setlistSongId?: number,
              sequenceNumber?: number,
              displaySequenceNumber?: number,
              setlistId?: number,
              songId?: number,
              isBreak?: boolean,
              name?: string,
              artist?: string,
              genre?: string,
              songKey?: string,
              length?: number,
              tempo?: number,
              deleted?: boolean,
              notes?: string,
              other?: string) {
      const newDate = new Date().toISOString();
      super(songId, name, artist, genre, songKey, length, tempo, deleted, false, notes, other, newDate, 0,
        '', 4, 4, 4, '', '',
        '', '', '', 3, 30, {}, {});
      this.setlistSongId = setlistSongId;
      this.sequenceNumber = sequenceNumber;
      this.displaySequenceNumber = displaySequenceNumber;
      this.isBreak = isBreak;
      this.songId = songId;
      this.setlistId = setlistId;
  }



  static fromJsonArray(array): SetlistSong[] {
    return array.map(json => SetlistSong.fromJson(json));

  }

  // noinspection JSAnnotator
  static fromSetlistSongJson({
    setlistSongId,
    sequenceNumber,
    displaySequenceNumber,
    songId,
    setlistId,
    isBreak,
    accountId,
    name,
    artist,
    genre,
    songKey,
    length,
    tempo,
    deleted,
    notes,
    other
  }
  ): SetlistSong {
      if (_.isNull(isBreak) === true) {
        isBreak = false;
      }
      return new SetlistSong(
        setlistSongId,
        sequenceNumber,
        displaySequenceNumber,
        setlistId,
        songId,
        isBreak,
        name,
        artist,
        genre,
        songKey,
        length,
        tempo,
        deleted,
        notes,
        other);
  }
}