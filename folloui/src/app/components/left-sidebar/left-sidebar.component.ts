import { CommunityService } from './../../services/community.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  followingCommunities: any;
  createdCommunities: any;
  user: any;
  constructor(private userService: UserService, private router: Router, private store: Store<any>) {
  }

  ngOnInit() {
    this.store.select('userAuth').subscribe((userAuth) => {
      console.log(`LEFT BAR: ${userAuth}`);
      console.log(userAuth);
      this.user = userAuth;
      this.populateCommunity();
    });
  }

  populateCommunity() {
    if (this.user != null) {

      this.userService.getUserDetail(this.user.token, this.user.email).toPromise()
        .then(res => {
          if (res.status === 200) {
            console.log('GET ALL USER', res.body.createdCommunities);
            this.followingCommunities = res.body.followingCommunities;
            this.createdCommunities = res.body.createdCommunities;
          }
        }).catch(err => {
          console.log('ERROR GETTING USER DATA', err);
        });

    }
  }

  viewCommDetail(cname: string) {
    console.log('VIEW COMM DETAIL');
    this.router.navigate(['/community', cname]);
  }
}
