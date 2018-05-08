import { TestBed, inject } from '@angular/core/testing';

import { MusicSearchService } from './music-search.service';

describe('MusicSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicSearchService]
    });
  });

  it('should be created', inject([MusicSearchService], (service: MusicSearchService) => {
    expect(service).toBeTruthy();
  }));
});
