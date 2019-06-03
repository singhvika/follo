export class Community {
  cname: string;
  description: string;
  public constructor(init?: Partial<Community>) {
    Object.assign(this, init);
  }
}
