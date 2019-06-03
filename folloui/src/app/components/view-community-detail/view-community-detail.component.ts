import { PostService } from './../../services/post.service';
import { Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { Store } from '@ngrx/store';
import { CommunityService } from './../../services/community.service';
import { Post } from './../../models/post';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-community-detail',
  templateUrl: './view-community-detail.component.html',
  styleUrls: ['./view-community-detail.component.scss']
})
export class ViewCommunityDetailComponent implements OnInit {

  posts: any;
  communityName: string;
  authToken: string;
  community: any;
  currentUserName: Observable<string>;
  followingCommunities: any;
  authUser: any;
  canFollow: boolean;
  commPicture: string;
  // upVotes: number;
  // downVotes: number;
  isPresentInFollowing: boolean;

  err: string;
  errMsg: string;

  constructor(private postService: PostService, private route: ActivatedRoute, private userService: UserService, private commService: CommunityService, private store: Store<any>) { }

  ngOnInit() {

    this.store.select('userAuth').subscribe((userAuth) => {
      console.log(`TOKENS STATUS CHANGED IN VIEW COMMUNITY: ${userAuth}`);
      console.log(userAuth);
      this.authUser = userAuth;
      if (this.authUser) {
        this.authToken = userAuth.token;
        this.currentUserName = userAuth.username;
      }
    });


    this.canFollow = false;
    this.route.params.subscribe(name => {
      console.log('INSIDE VIEW DETAILS', name);
      this.community = [];
      this.posts = [];
      this.isPresentInFollowing ? false : true;
      this.err = null;
      this.communityName = name.cname;
      this.viewCommunityDetails();
      this.getUserDetails();

    });
  }

  getUserDetails() {
    if (this.authUser != null) {

      this.userService.getUserDetail(this.authUser.token, this.authUser.email).toPromise()
        .then(res => {
          if (res.status === 200) {
            this.followingCommunities = res.body.followingCommunities;
            for (let i = 0; i < this.followingCommunities.length; i++) {
              console.log("FOLLOWING ", this.followingCommunities[i].community.name);
              if (this.followingCommunities[i].community.name === this.communityName) {
                this.isPresentInFollowing = true;
                break;
              }
            }
          }
        }).catch(err => {
          console.log('ERROR GETTING USER DATA', err);
          this.errMsg = "Not able to get user data";
        });
    }
  }

  viewCommunityDetails() {

    this.commService.getCommunityDetails(this.communityName, this.authToken).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log('RESPONSE FOR GET COMM DETAILS ', res);
          this.community = res.body;
          console.log('found community:');
          console.log(this.community);
          this.canFollow = this.community.createdBy.user.username === this.currentUserName ? false : true;
          this.commPicture = (this.community.communityPicture != null) ?
            this.community.communityPicture : '../../../assets/images/create-community-header.png';

        }
      }).catch(err => {
        console.log('ERROR GETTING COMMUNITY DETAILS', err);
        this.err = err;
        this.commPicture = '../../../assets/images/404.jpg'
      });

    this.commService.getCommunityPostsByCommName(this.communityName, this.authToken).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log(res);
          this.posts = res.body;
        }
      }).catch(err => {
        console.log('Error viewing community details', err);
        this.errMsg = "There is no post for this community";
      });
  }

  follow() {
    console.log("FOLLOW TOKEN ", this.authToken);
    this.commService.followCommunity(this.communityName, this.authToken).toPromise()
      .then(res => {
        // if (res.status === 200) {
        console.log("FOLLOWING COM SUCCESS");
        this.isPresentInFollowing = true;
        //}
      }).catch(err => {
        console.log("ERROR FOLLOWING COM", err);
        this.errMsg = "Not able to follow";
      });
  }

  unFollow() {
    this.commService.unFollowCommunity(this.communityName, this.authToken).toPromise()
      .then(res => {
        if (res.status === 200) {
          console.log("UN FOLLOWING COM SUCCESS");
          this.isPresentInFollowing = false;
         
        }
      }).catch(err => {
        console.log("ERROR UN FOLLOWING COM", err);
        this.errMsg = "Not able to unfollow";
      });
  }

  voteUp(vu: any, vd: any, postId: number) {
    this.postService.getUpVotes(this.authUser.token, postId, this.communityName).toPromise()
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

  voteDown(vu: any, vd: any, postId: number) {
    this.postService.getDownVotes(this.authUser.token, postId, this.communityName).toPromise()
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
