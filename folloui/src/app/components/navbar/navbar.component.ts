import { AppState } from './../../app.state';
import { Store } from '@ngrx/store';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import * as TokenActions from './../../token-store/actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  loggedInUser: any;
  constructor(private store: Store<any>, private ls: LoginService, private router: Router) {
    store.select('userAuth').subscribe((userAuth) => {
      console.log(`TOKENS STATUS CHANGED: ${userAuth}`);
      console.log(userAuth);
      this.loggedInUser = userAuth;
    });
  }

  ngOnInit() {
  }

  logout() {
    console.log('logging you out');
    this.ls.doLogout(this.loggedInUser.token).toPromise().then(res => {
      if (res.status === 200) {
        this.store.dispatch(new TokenActions.RemoveToken(null));
        localStorage.removeItem('userAuth');
        this.router.navigate(['']);
      }
    }).catch(err => {
      console.log('ERROR LOGGING OUT', err);
    });
  }

  search(input: any, searchKey: string) {
    input.value = "";
    this.router.navigate(['search', searchKey]);
  }
}
