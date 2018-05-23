
export class Song {
  constructor(
    public SongId: number,
    public Name: string,
    public ArtistName: string,
    public GenreName: string,
    public Key: string,
    public SongLength: number,
    public Tempo: number,
    public Deleted: boolean,
    public Deprecated: boolean,
    public Notes: string,
    public Other: string,
    public LastEdit: string,
    public SongType: number,
    public Lyrics: string,
    public NoteValue: number,
    public BeatValue: number,
    public Transpose: number,
    public YouTubeUrl: string,
    public SongLocation: string,
    public CreatedByUserId: string,
    public Blob: string,
    public DocumentLocation: string,
    public LengthMin: number,
    public LengthSec: number,
    public Artist: object,
    public Genre: object,
    ) {
  }


  static createNewSong(): Song{
    const newDate = new Date().toISOString();
    const newSong: Song = new Song(-1, '', '',
      '', 'A', 240, 120, false, false, '', '', newDate, 0,
      '', 4, 4, 4, '', '',
      '', '', '', 3, 30, {}, {});
    return newSong;
  }
  static fromJsonArray(array): Song[] {
    return array.map(json => Song.fromJson(json));

  }

  static toJson(song: Song) {
    return {
      'SongId': song.SongId,
      'SongType': song.SongType == null ? song.SongType : 0,
      'Name': song.Name ? song.Name : '',
      'ArtistName': song.ArtistName ? song.ArtistName : '',
      'GenreName': song.GenreName ? song.GenreName : '',
      'SongLength': song.SongLength !== null ? song.SongLength : '',
      'Deprecated': song.Deprecated ? song.Deprecated : '',
      'Deleted': song.Deleted ? song.Deleted : '',
      'Key': song.Key ? song.Key : '',
      'Notes': song.Notes ? song.Notes : '',
      'Lyrics': song.Lyrics ? song.Lyrics : '',
      'LastEdit': song.LastEdit ? song.LastEdit : '',
      'Tempo': song.Tempo !== null ? song.Tempo : '',
      'NoteValue': song.NoteValue ? song.NoteValue : '',
      'BeatValue': song.BeatValue ? song.BeatValue : '',
      'Transpose': song.Transpose ? song.Transpose : '',
      'Other': song.Other ? song.Other : '',
      'YouTubeUrl': song.YouTubeUrl ? song.YouTubeUrl : '',
      'CreatedByUserId': song.CreatedByUserId,
      'Blob': song.Blob,
      'SongLocation': song.SongLocation,
      'DocumentLocation': song.DocumentLocation
    };
  }

  public static getSongLengthMinSec(SongLength) {
    return {
      minutes: Math.floor(SongLength / 60),
      seconds: SongLength % 60
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
    let ArtistName = '';
    let GenreName = '';
    if (Artist) {
      ArtistName = Artist.Name;
    }
    if (Genre) {
      GenreName = Genre.Name;
    }

    const songLengthMinSec = Song.getSongLengthMinSec(SongLength);
    return new Song(
      SongId,
      Name,
      ArtistName,
      GenreName,
      Key,
      SongLength || 180,
      Tempo || 120,
      Deleted || false,
      Deprecated || false,
      Notes,
      Other ,
      LastEdit || new Date().toISOString(),
      SongType || 0,
      Lyrics ,
      NoteValue || 4,
      BeatValue || 4,
      Transpose || 0,
      YouTubeUrl ,
      SongLocation,
      CreatedByUserId,
      Blob,
      DocumentLocation,
      songLengthMinSec.minutes,
      songLengthMinSec.seconds,
      Artist,
      Genre
    );
  }
}
