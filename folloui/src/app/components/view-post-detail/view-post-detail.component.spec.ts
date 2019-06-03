import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostDetailComponent } from './view-post-detail.component';

describe('ViewPostDetailComponent', () => {
  let component: ViewPostDetailComponent;
  let fixture: ComponentFixture<ViewPostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
