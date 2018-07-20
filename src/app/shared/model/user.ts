
export class User {
    constructor(
        public $key: string,
        public firstName: string,
        public lastName: string,
        public emailAddress: string,
        public role: string,
        public userAccountId: string
    ){

    }


    static fromJsonArray(array): User[] {
        return array.map(json => User.fromJson(json));

    }

    public static toJson(data: User) {
        return {
          'FirstName': data.firstName,
          'LastName': data.lastName,
          'Email': data.emailAddress 
        };
      }

    static fromJson({
        FirstName,
        LastName,
        Email
    }
    ): User {
        return new User(
            "",
            FirstName,
            LastName,
            Email,
            "",
            "");
    }
}
