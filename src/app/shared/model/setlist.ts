import {Song} from './song';

export class Setlist {
  constructor(
    public setlistId: number,
    public name: string,
    public gigLocation: string,
    public lastEdit: string,
    public gigDate: string
) {

}


static fromJsonArray(array): Setlist[] {
  return array.map(json => Setlist.fromJson(json));

}

  static toJson(setlist: Setlist) {
    return {
      'SetlistId': setlist.setlistId,
      'Name': setlist.name ? setlist.name : '',
      'LastEdit': setlist.lastEdit ? setlist.lastEdit : '',
      'GigLocation': setlist.gigLocation,
      'GigDate': setlist.gigDate
    };
  }

static fromJson({
    setlistId,
    name,
    gigLocation,
    lastEdit,
    gigDate
}
): Setlist {
  return new Setlist(
    setlistId,
    name,
    gigLocation,
    lastEdit,
    gigDate);
}
}
