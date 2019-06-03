import { Store } from '@ngrx/store';
import { LoginService } from './../../services/login.service';
import { Community } from './../../models/community';
import { Component, OnInit, Input } from '@angular/core';
import { NavTabService } from 'src/app/services/main-content.service';
import { AppState } from 'src/app/app.state';
@Component({
  selector: 'app-main-content-grid',
  templateUrl: './main-content-grid.component.html',
  styleUrls: ['./main-content-grid.component.scss']
})
export class MainContentGridComponent implements OnInit {

  isLoggedIn: boolean;
  communities: Community[];
  @Input() isDiscover: boolean;

  constructor(private navTabService: NavTabService, private ls: LoginService, private store: Store<AppState>) { }

  ngOnInit() {
    this.navTabService.currentTab.subscribe(com => this.communities = com);
    this.store.select('isLoggedIn').subscribe((status) => { this.isLoggedIn = status; });
  }

}
