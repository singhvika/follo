import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchResultComponent } from './view-search-result.component';

describe('ViewSearchResultComponent', () => {
  let component: ViewSearchResultComponent;
  let fixture: ComponentFixture<ViewSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
