import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommunityDetailComponent } from './view-community-detail.component';

describe('ViewCommunityDetailComponent', () => {
  let component: ViewCommunityDetailComponent;
  let fixture: ComponentFixture<ViewCommunityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCommunityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCommunityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
