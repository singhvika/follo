import { PostService } from './../../services/post.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from './../../models/post';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  private post: Post;
  createPostForm: FormGroup;
  authToken: string;
  authUser: any;
  followingCommunities: any;
  createdCommunities: any;
  selectCommunity: string;
  postType = [
    'Text',
    'Image'
  ];
  err: string;
  selectedPostType: string;
  @ViewChild('labelImport')
  labelImport: ElementRef;
  filesToUpload: FileList;

  constructor(private store: Store<any>, private postService: PostService, private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.store.select('userAuth').subscribe((userAuth) => {
      console.log(`TOKENS STATUS CHANGED IN CREATE POST: ${userAuth}`);
      console.log(userAuth);
      this.authUser = userAuth;
      this.authToken = userAuth.token;
    });
    this.selectCommunity = 'Select';
    this.selectedPostType = 'Text';
    this.getUserDetails();
    this.createPostForm = this.fb.group({
      title: [null, Validators.required],
      content: [null, Validators.required]
    });


  }
  addPost() {
    if (this.createPostForm.valid) {
      this.post = new Post(this.createPostForm.value);
      if (this.selectedPostType === 'Text') {
        this.post.type = 'text';
      } else if (this.selectedPostType === 'Image') {
        this.post.type = 'image';
        this.post.post_media = [];
        Array.from(this.filesToUpload).forEach(file => {
          this.post.post_media.push(file.name);
        });
      }

      this.postService.createPost(this.post, this.selectCommunity, this.authToken, this.filesToUpload).toPromise()
        .then(res => {
          if (res.status === 200) {
            console.log('CREATED POST SUCCESSFULLY', res);
            this.router.navigateByUrl('/community/' + this.selectCommunity + "/post/" + res.body.post._id);
          }
        }).catch(err => {
          console.log(err);
          console.log('ERROR CREATING POST');
          this.err = "Cannot create post"
        });
    }
  }

  getUserDetails() {
    if (this.authToken != null) {

      this.userService.getUserDetail(this.authUser.token, this.authUser.email).toPromise()
        .then(res => {
          if (res.status === 200) {
            this.followingCommunities = res.body.followingCommunities;
            this.createdCommunities = res.body.createdCommunities;
          }
        }).catch(err => {
          console.log('ERROR GETTING USER DATA', err);
          this.err = "Not able to get User data";
        });
    }
  }

  onSelectComm(e) {
    this.selectCommunity = e.srcElement.innerText;
  }

  onSelectPost(e) {
    this.selectedPostType = e.srcElement.innerText;
  }

  processFile(files: FileList) {
    this.filesToUpload = files;
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
  }
}
