import { TestBed } from '@angular/core/testing';

import { NavTabService } from './main-content.service';

describe('NavTabServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavTabService = TestBed.get(NavTabService);
    expect(service).toBeTruthy();
  });
});
