
export class PasswordChange {
    constructor(
        public currentPassword: string,
        public newPassword: string,
        public confirmPassword: string
    ){

    }


    static fromJsonArray(array): PasswordChange {
        return array.map(json => PasswordChange.fromJson(json));

    }

    public static toJson(data: PasswordChange) {
        return {
          'CurrentPassword': data.currentPassword,
          'NewPassword': data.newPassword,
          'ConfirmPassword': data.confirmPassword 
        };
      }

    static fromJson({
        CurrentPassword,
        NewPassword,
        ConfirmPassword
    }
    ): PasswordChange {
        return new PasswordChange(
            CurrentPassword,
            NewPassword,
            ConfirmPassword);
    }
}
