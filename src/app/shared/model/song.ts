
export class Song {
  constructor(
    public $key: string,
    public accountId: string,
    public name: string,
    public artist: string,
    public genre: string,
    public songKey: string,
    public length: number,
    public tempo: number,
    public deleted: boolean,
    public notes: string,
    public other: string,
    public createDate?: string
    ){
  }


  static fromJsonArray(array): Song[]{
    return array.map(json => Song.fromJson(json));

  }

  static fromJson({$key,
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
  ): Song {
    return new Song(
      $key,
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
    );
  }
}
