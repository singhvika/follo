import { Store } from '@ngrx/store';
import { CommunityService } from './../../services/community.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Community } from './../../models/community';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.scss']
})
export class CreateCommunityComponent implements OnInit {

  private community: Community;
  createComForm: FormGroup;
  fileToUpload: File;
  @ViewChild('labelImport')
  labelImport: ElementRef;
  authToken: any;
  err: string;
  constructor(private commService: CommunityService, private store: Store<any>, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
   
    this.store.select('userAuth').subscribe((userAuth) => {
      console.log(userAuth);
      this.authToken = userAuth;
    });

    if(!this.authToken){
      console.log('cannot create community due to unauthenticated user');
      console.log('redirecting');
      this.router.navigate(['login']);
    }

    this.createComForm = this.fb.group({
      cname: [null, Validators.required],
      description: [null, Validators.required]
    });


  }

  processFile(files: FileList) {
    this.fileToUpload = files.item(0);
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
  }

  addCommunity() {
    if (this.createComForm.valid) {
      this.community = new Community(this.createComForm.value);
      // Call the community service to add this community to the fav list
      this.commService.createCommunity(this.community, this.fileToUpload, this.authToken.token)
        .toPromise().then(resp => {
          if (resp.status === 200) {
            console.log("SUCCESS CREATE COMMUNITY");
            this.router.navigate(['/community', resp.body.cname]);
          }
        }).catch(err => {
          console.log("CANNOT CREATE COMMUNITY", err);
          err = 'Cannot Create Community';
        });
    }
  }
}
