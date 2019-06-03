import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  user: any;
  constructor(private store: Store<any>) {
    store.select('userAuth').subscribe((userAuth) => {
      console.log(`RIGHT BAR: ${userAuth}`);
      console.log(userAuth);
      this.user = userAuth;
    });
   }

  ngOnInit() {
  }

}
