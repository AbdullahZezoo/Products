import { TestBed } from '@angular/core/testing';

import { ProdserviceService } from './prodservice.service';

describe('ProdserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdserviceService = TestBed.get(ProdserviceService);
    expect(service).toBeTruthy();
  });
});
