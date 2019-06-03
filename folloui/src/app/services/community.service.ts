import { Post } from './../models/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Community } from './../models/community';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient) { }

  createCommunity(community: Community, commImage: File, token: string) {
    const formData = new FormData();
    console.log('community details');
    console.log(community);
    if (commImage) {
      formData.append('commImage', commImage, commImage.name);
    }
    formData.append('cname', community.cname);
    formData.append('description', community.description);
    console.log('formDAta');
    console.log(formData);
    return this.http.post<any>('http://localhost:3000/community', formData, {
      headers: {
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    });
  }

  getAllCommunities() {
    return this.http.get('http://localhost:3000/community', { observe: 'response' });
  }

  getAllCommunitiesForUser(username: string) {
    return this.http.get('http://localhost:3000/' + username + '/community', { observe: 'response' });
  }

  getCommunityPostsByCommName(commName: string, token: string) {
    return this.http.get('http://localhost:3000/community/' + commName + '/post/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    });
  }

  getCommunityDetails(commName: string, token: string) {
    return this.http.get('http://localhost:3000/community/' + commName, {
      headers: {
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    });
  }


  getCommunitySearchResult(cname: string) {
    return this.http.get<any>('http://localhost:3000/community?key=' + cname, {
      observe: 'response'
    });
  }

  getPostSearchResult(cname: string) {
    return this.http.get<any>('http://localhost:3000/community/post/search?key=' + cname, {
      observe: 'response'
    });
  }

  followCommunity(cname: string, token: string) {
    return this.http.put("http://localhost:3000/community/follow/" + cname, "", {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      observe: 'response'
    });
  }

  unFollowCommunity(cname: string, token: string) {
    return this.http.put("http://localhost:3000/community/unfollow/" + cname, "", {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      observe: 'response'
    });
  }
}
