export class User {
    public password?: String
    // tslint:disable-next-line:no-inferrable-types
    // public selected?: boolean = false
    constructor(
      public id: number,
      public username: String
    ) {}
}
