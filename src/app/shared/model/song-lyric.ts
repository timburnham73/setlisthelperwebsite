
export class SongLyric {
  constructor(
    public $key: string,
    public name: string,
    public songId: string,
    public lyrics: string,
    public createdByUser: string,
    public displaySettings: any = {},
    public isDefault: boolean = false
  ){
  }


  static fromJsonArray(array): SongLyric[]{
    return array.map(json => SongLyric.fromJson(json));

  }

  static fromJson({
    $key,
    name,
    songId,
    lyrics,
    createdByUser,
    displaySettings,
    isDefault
  }
  ): SongLyric {
    return new SongLyric(
      $key,
      name,
      songId,
      lyrics,
      createdByUser,
      displaySettings,
      isDefault
    );
  }
}
