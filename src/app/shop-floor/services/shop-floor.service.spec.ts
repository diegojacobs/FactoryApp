import { TestBed } from '@angular/core/testing';

import { ShopFloorService } from './shop-floor.service';

describe('ShopFloorService', () => {
  let service: ShopFloorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopFloorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
