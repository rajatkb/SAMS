import { TestBed, inject } from '@angular/core/testing';

import { OutletService } from './outlet.service';

describe('OutletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutletService]
    });
  });

  it('should be created', inject([OutletService], (service: OutletService) => {
    expect(service).toBeTruthy();
  }));
});
