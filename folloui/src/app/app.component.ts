import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TokenActions from './token-store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'follo-ing';
  createCommunity: string;

  constructor(private route: ActivatedRoute, private store: Store<any>) {
  }
  ngOnInit() {
    console.log('loading userAuth from localStorage');
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth && userAuth.length !== 0) {
      this.store.dispatch(new TokenActions.AddToken(JSON.parse(userAuth)));
    } else {
      console.log('no userAuth in localStorage');
    }
  }
}
