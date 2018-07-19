
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
        $key,
        firstName,
        lastName,
        emailAddress,
        role,
        userAccountId
    }
    ): User {
        return new User(
            $key,
            firstName,
            lastName,
            emailAddress,
            role,
            userAccountId);
    }
}
