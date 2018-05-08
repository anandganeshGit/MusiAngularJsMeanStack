import { TestBed, inject } from '@angular/core/testing';

import { WebApiDbService } from '../web-api-db.service';

describe('WebApiDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebApiDbService]
    });
  });

  it('should be created', inject([WebApiDbService], (service: WebApiDbService) => {
    expect(service).toBeTruthy();
  }));
});
