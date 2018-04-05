
export class Tag {
  constructor(
    public $key: string,
    public name: string
  ){

  }


  static fromJsonArray(array): Tag[]{
    return array.map(json => Tag.fromJson(json));

  }

  static fromJson({
    $key,
    name
  }
  ): Tag{
    return new Tag(
      $key,
      name);
  }
}
