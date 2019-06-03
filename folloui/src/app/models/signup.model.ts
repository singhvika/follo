export class Signup {
  public constructor(init?: Partial<Signup>) {
    Object.assign(this, init);
  }
  username: string;
  password: string;
  cpassword: string;
  email: string;
  firstName: string;
  lastName: string;
}
