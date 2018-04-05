
export class UserSongLyric{
  constructor(
    public $key: string,
    public songId: string,
    public songLyricId: string,
    public userId: string,
    public isDefault: boolean
  ){
  }


  static fromJsonArray(array): UserSongLyric[]{
    return array.map(json => UserSongLyric.fromJson(json));

  }

  static fromJson({
    $key,
    songId,
    songLyricId,
    userId,
    isDefault
  }
  ): UserSongLyric {
    return new UserSongLyric(
      $key,
      songId,
      songLyricId,
      userId,
      isDefault
    );
  }
}
