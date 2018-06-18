/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SetlistService } from './setlist.service';

describe('Service: Setlist', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetlistService]
    });
  });

  it('should ...', inject([SetlistService], (service: SetlistService) => {
    expect(service).toBeTruthy();
  }));
});
