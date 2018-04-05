/**
 * Created by tim on 12/27/16.
 */
export class Account {
  $key: string;
  name: string;
  users: any[];
  constructor(value: string, label: string, users: any[]) {
    this.$key = value;
    this.name = label;
    this.users = users;
  }
  static fromJson({
    $key,
    name,
    users
  }
  ): Account {
    return new Account(
      $key,
      name,
      users
    );
  }

  static fromJsonArray(array): Account[]{
    return array.map(json => Account.fromJson(json));

  }
}
