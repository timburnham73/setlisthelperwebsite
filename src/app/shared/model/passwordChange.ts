
export class PasswordChange {
    constructor(
        public currentPassword string,
        public newPassword: string,
        public confirmPassword: string,
    ){

    }


    static fromJsonArray(array): PasswordChange {
        return array.map(json => PasswordChange.fromJson(json));

    }

    public static toJson(data: PasswordChange) {
        return {
          'CurrentPassword': PasswordChange.currentPassword,
          'NewPassword': PasswordChange.newPassword,
          'ConfirmPassword': PasswordChange.confirmPassword 
        };
      }

    static fromJson({
        CurrentPassword,
        NewPassword,
        ConfirmPassword
    }
    ): User {
        return new PasswordChange(
            CurrentPassword,
            NewPassword,
            ConfirmPassword);
    }
}
