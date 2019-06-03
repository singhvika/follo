export class Post {
  title: string;
  content: string;
  type: string;
  post_media: string[];
  public constructor(init?: Partial<Post>) {
    Object.assign(this, init);
  }
}
