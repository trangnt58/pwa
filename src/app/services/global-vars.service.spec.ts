/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalVarsService } from './global-vars.service';

describe('GlobalVarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalVarsService]
    });
  });

  it('should ...', inject([GlobalVarsService], (service: GlobalVarsService) => {
    expect(service).toBeTruthy();
  }));
});
