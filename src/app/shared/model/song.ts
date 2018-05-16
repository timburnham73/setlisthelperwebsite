
export class Song {
  constructor(
    public songId: string,
    public name: string,
    public artistName: string,
    public genreName: string,
    public key: string,
    public songLength: number,
    public tempo: number,
    public deleted: boolean,
    public deprecated: boolean,
    public notes: string,
    public other: string,
    public lastEdit: string,
    public songType: number,
    public lyrics: string,
    public noteValue: number,
    public beatValue: number,
    public transpose: number,
    public youTubeUrl: string,
    public songLocation: string,
    public createdByUserId: string,
    public blob: string,
    public documentLocation: string,
    public lengthMin: number,
    public lengthSec: number
    ) {
  }


  static fromJsonArray(array): Song[] {
    return array.map(json => Song.fromJson(json));

  }

  static toJson(song: Song) {
    return {
      'songId': song.songId,
      'songType': song.songType == null ? song.songType : 0,
      'name': song.name ? song.name : '',
      'artistName': song.artistName ? song.artistName : '',
      'genreName': song.genreName ? song.genreName : '',
      'songLength': song.songLength ? song.songLength : '',
      'deprecated': song.deprecated ? song.deprecated : '',
      'deleted': song.deleted ? song.deleted : '',
      'key': song.key ? song.key : '',
      'notes': song.notes ? song.notes : '',
      'lyrics': song.lyrics ? song.lyrics : '',
      'lastEdit': song.lastEdit ? song.lastEdit : '',
      'tempo': song.tempo ? song.tempo : '',
      'noteValue': song.noteValue ? song.noteValue : '',
      'beatValue': song.beatValue ? song.beatValue : '',
      'transpose': song.transpose ? song.transpose : '',
      'other': song.other ? song.other : '',
      'youTubeUrl': song.youTubeUrl ? song.youTubeUrl : '',
      'createdByUserId': song.createdByUserId,
      'blob': song.blob,
      'songLocation': song.songLocation,
      'documentLocation': song.documentLocation
    };
  }

  public static getSongLengthMinSec(songLength) {
    return {
      minutes: Math.floor(songLength / 60),
      seconds: songLength % 60
    };
  }
  static fromJson({SongId,
                    Name,
                    Artist,
                    Genre,
                    Key,
                    SongLength,
                    Tempo,
                    Deleted,
                    Deprecated,
                    Notes,
                    Other,
                    LastEdit,
                    SongType,
                    Lyrics,
                    NoteValue,
                    BeatValue,
                    Transpose,
                    YouTubeUrl,
                    SongLocation,
                    CreatedByUserId,
                    Blob,
                    DocumentLocation
  }
  ): Song {
    let artistName = '';
    let genreName = '';
    if (Artist) {
      artistName = Artist.Name;
    }
    if (Genre) {
      genreName = Genre.Name;
    }

    const songLengthMinSec = Song.getSongLengthMinSec(SongLength);
    return new Song(
      SongId,
      Name,
      artistName,
      genreName,
      Key,
      SongLength && 180,
      Tempo && 120,
      Deleted && false,
      Deprecated && false,
      Notes,
      Other ,
      LastEdit && new Date().toISOString(),
      SongType && 0,
      Lyrics ,
      NoteValue && 4,
      BeatValue && 4,
      Transpose && 0,
      YouTubeUrl ,
      SongLocation,
      CreatedByUserId,
      Blob,
      DocumentLocation,
      songLengthMinSec.minutes,
      songLengthMinSec.seconds
    );
  }
}
