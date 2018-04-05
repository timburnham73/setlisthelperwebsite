
export class Setlist {
  constructor(
    public $key: string,
    public name: string,
    public gigLocation: string,
    public createDate: string,
    public gigDate: string,
    public accountId: string
) {

}


static fromJsonArray(array): Setlist[] {
  return array.map(json => Setlist.fromJson(json));

}

static fromJson({
  $key,
  name,
  gigLocation,
  createDate,
  gigDate,
  accountId
}
): Setlist {
  return new Setlist(
    $key,
    name,
    gigLocation,
    createDate,
    gigDate,
  accountId);
}
}
