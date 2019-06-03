import { CreatePostComponent } from './components/create-post/create-post.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { FormsModule } from '@angular/forms';
import { MainContentGridComponent } from './components/main-content-grid/main-content-grid.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { CreateCommunityComponent } from './components/create-community/create-community.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './reducers/login.reducers';
import { reducer as authTokenReducer } from './token-store/reducer';
import { ViewCommunityDetailComponent } from './components/view-community-detail/view-community-detail.component';
import { MainComponent } from './components/main/main.component';
import { ContentComponent } from './components/content/content.component';
import { ViewSearchResultComponent } from './components/view-search-result/view-search-result.component';
import { ViewPostDetailComponent } from './components/view-post-detail/view-post-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    FieldErrorDisplayComponent,
    SignupComponent,
    NavbarComponent,
    LeftSidebarComponent,
    MainContentGridComponent,
    RightSidebarComponent,
    CreateCommunityComponent,
    ViewCommunityDetailComponent,
    MainComponent,
    ContentComponent,
    CreatePostComponent,
    ViewSearchResultComponent,
    ViewPostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      userAuth: authTokenReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
