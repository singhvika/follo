import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentGridComponent } from './main-content-grid.component';

describe('MainContentGridComponent', () => {
  let component: MainContentGridComponent;
  let fixture: ComponentFixture<MainContentGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainContentGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
