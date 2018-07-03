import {Song} from './song';

export class Setlist {
  constructor(
    public SetListId: number,
    public Name: string,
    public GigLocation: string,
    public LastEdit: string,
    public GigDate: string,
    public CreatedByUserId: string,
    public Deleted: boolean,
    public Deprecated: boolean,
    public MakePublic: boolean
) {

}


static fromJsonArray(array): Setlist[] {
  return array.map(json => Setlist.fromJson(json));

}

  static createNewSetlist(): Setlist {
    const newDate = new Date().toISOString();
    const newSetlist: Setlist = new Setlist(
      -1,
      '',
      '',
      new Date().toISOString(),
      new Date().toISOString(),
      '',
      false,
      false,
      false);
    return newSetlist;
  }

  static toJson(setlist: Setlist) {
    return {
      'SetListId': setlist.SetListId,
      'Name': setlist.Name ? setlist.Name : '',
      'LastEdit': setlist.LastEdit ? new Date(setlist.LastEdit).toISOString() : '',
      'GigLocation': setlist.GigLocation,
      'GigDate': setlist.GigDate,
      'CreatedByUserId': setlist.CreatedByUserId,
      'Deleted': setlist.Deleted,
      'Deprecated': setlist.Deprecated,
      'MakePublic': setlist.MakePublic

    };
  }

static fromJson({
    setlistId,
    name,
    gigLocation,
    lastEdit,
    gigDate,
    createdByUserName,
    createdByUserId,
    dateCreated,
    deleted,
    deprecated,
    makePublic
}
): Setlist {
  return new Setlist(
    setlistId,
    name,
    gigLocation,
    lastEdit,
    gigDate,
    createdByUserId,
    deleted,
    deprecated,
    makePublic);
}
}
