
export class PasswordChangeResults {
    constructor(        
        public isSuccess: boolean,
        public results: string,
    ){

    }


    static fromJsonArray(array): PasswordChangeResults {
        return array.map(json => PasswordChangeResults.fromJson(json));

    }

    public static toJson(data: PasswordChangeResults) {
        return {
          'IsSuccess': data.isSuccess,
          'Results': data.results
        };
      }

    static fromJson({IsSuccess, Results}): PasswordChangeResults {
        return new PasswordChangeResults(IsSuccess, Results);
    }
}
