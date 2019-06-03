import { Community } from '../models/community';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavTabService {

  comms: Community[];
  private communitySource = new BehaviorSubject(this.comms);
  currentTab = this.communitySource.asObservable();

  constructor() { }

  changeCommunityTab(communites: Community[]) {
    console.log(communites);
    this.communitySource.next(communites);
  }
}
