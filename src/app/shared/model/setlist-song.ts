
import {Song} from './song';

declare var _: any;
declare var $: any;

export class SetlistSong extends Song{
  get sequenceNumber(): number {
    return this._sequenceNumber;
  }

  set sequenceNumber(value: number) {
    this._sequenceNumber = value;
  }
  public $key: string;
  private _sequenceNumber: number;
  public displaySequenceNumber: number;
  public songId: string;
  public setlistId: string;
  public isBreak: boolean;


  constructor($key?: string,
              sequenceNumber?: number,
              displaySequenceNumber?: number,
              setlistId?: string,
              songId?: string,
              isBreak?: boolean,
              accountId?: string,
              name?: string,
              artist?: string,
              genre?: string,
              songKey?: string,
              length?: number,
              tempo?: number,
              deleted?: boolean,
              notes?: string,
              other?: string,
              createDate?: string){
      super(songId, accountId, name, artist, genre, songKey, length, tempo, deleted, notes, other, createDate);
      this.$key = $key;
      this._sequenceNumber = sequenceNumber;
      this.displaySequenceNumber = displaySequenceNumber;
      this.isBreak = isBreak;
      this.songId = songId;
      this.setlistId = setlistId;
  }



  static fromJsonArray(array): SetlistSong[]{
    return array.map(json => SetlistSong.fromJson(json));

  }

  static fromJson({$key,
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
    other,
    createDate
  }
  ): SetlistSong {
      if (_.isNull(isBreak) === true) {
        isBreak = false;
      }
      return new SetlistSong(
        $key,
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
        other,
        createDate);
  }
}
