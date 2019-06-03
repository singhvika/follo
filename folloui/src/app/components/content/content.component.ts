import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { UserService } from '../../services/user.service';
import { PostService } from 'src/app/services/post.service';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  currentDiscoverPage:number = 1;
  discoverPosts: Array<Post> = [];
  personalPosts: Array<Post> = [];
  viewToDisplay: string = 'discover'

  constructor(private userService: UserService, private postService: PostService, private store: Store<any>) {
    
   }

  authUser: any;
  authToken: string;
  errMsg: string;
  ngOnInit() {
    this.currentDiscoverPage = 1;
    this.store.select('userAuth').subscribe((userAuth) => {
      console.log(`TOKENS STATUS CHANGED IN main content: ${userAuth}`);
      console.log(userAuth);
      this.authUser = userAuth;
      if (this.authUser) {
        console.log('user changed for feed');
        this.authToken = userAuth.token;
      }
    });

    this.fetchDiscoverPosts();
    if (this.authUser){
      this.fetchPersonalPosts();
    }
    
  }


  fetchDiscoverPosts() {
    console.log('fetching with offset' + this.currentDiscoverPage);
    this.userService.getDiscoverPosts(this.currentDiscoverPage)
      .then(res => {
        console.log('discovered posts');
        console.log(res);
        console.log(res.body.posts);
        if (res.body.posts.length > 0) {
          this.currentDiscoverPage = this.currentDiscoverPage + 1;
        }

        this.discoverPosts = [...this.discoverPosts, ...res.body.posts];
      })
      .catch(err => {
        console.log(err);
      })
  }

  fetchPersonalPosts() {

    this.userService.getPersonalPosts(this.authToken)
    .then(res => {
      this.personalPosts = res.body.posts;

    })
  }

  setView(view: string) {
    this.viewToDisplay = view;
  }

  voteUp(vu: any, vd: any, postId: number, cname: string) {
    this.postService.getUpVotes(this.authUser.token, postId, cname).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log('UPVOTES SUCCESS', res.body);
          vu.innerText = res.body.upvotes;
          vd.innerText = res.body.downvotes;
        }
      }).catch(err => {
        console.log("UVOTES FAILED", err);
        this.errMsg = "Not able to vote up";
      });
  }

  voteDown(vu: any, vd: any, postId: number, cname: string) {
    this.postService.getDownVotes(this.authUser.token, postId, cname).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log('DOWNVOTES SUCCESS', res.body);
          vu.innerText = res.body.upvotes;
          vd.innerText = res.body.downvotes;
        }
      }).catch(err => {
        console.log("DOWNVOTES FAILED", err);
        this.errMsg = "Not able to down vote";
      });
  }

}