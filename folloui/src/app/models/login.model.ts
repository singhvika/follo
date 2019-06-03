export class Login {
  public constructor(init?: Partial<Login>) {
    Object.assign(this, init);
  }
  email: string;
  password: string;
}
