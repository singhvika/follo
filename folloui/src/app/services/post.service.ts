import { HttpClient } from '@angular/common/http';
import { Post } from './../models/post';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post, commName: string, token: string, filestoUpload: FileList) {
    console.log('post from component');
    console.log(post);
    let headers;
    const formData = new FormData();
    formData.append('type', post.type);
    formData.append('title', post.title);
    formData.append('content', post.content);
    if (post.type === 'image') {
      console.log('adding imgaeg');
      formData.append('media_image', filestoUpload.item(0),filestoUpload.item(0).name);
    }

    switch (post.type) {
      case 'text':
        headers = {
          'Authorization': 'Bearer ' + token
        }
        break;

      default:
        headers = {
          'Authorization': 'Bearer ' + token
        }
    }
    console.log('sending post');
    console.log(post)
    return this.http.post<any>('http://localhost:3000/community/' + commName + '/post/', formData, {
      headers: headers,
      observe: 'response'
    });
  }

  getPostById(token: string, postId: number, cname: string) {
    return this.http.get<any>("http://localhost:3000/community/" + cname + "/post/" + postId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    });
  }

  addCommentToPost(token: string, postId: number, cname: string, comment: string) {

    return this.http.post<any>("http://localhost:3000/community/" + cname + "/" + postId + "/comment", { 'text': comment }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    })
  }

  getUpVotes(token: string, postId: number, cname: string) {
    return this.http.get<any>("http://localhost:3000/community/" + cname + "/post/" + postId + "/upvote", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    })
  }

  getDownVotes(token: string, postId: number, cname: string) {
    return this.http.get<any>("http://localhost:3000/community/" + cname + "/post/" + postId + "/downvote", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    });
  }

  deleteComment(token: string, postId: number, commentId: string) {
    return this.http.put<any>("http://localhost:3000/community/" + postId + "/delete/" + commentId, "", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }, observe: 'response'
    })
  }
}
