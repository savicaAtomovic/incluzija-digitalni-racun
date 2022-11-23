import { TestBed } from '@angular/core/testing';

import { TopbarTitleService } from './title.service';

describe('TitleService', () => {
  let service: TopbarTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopbarTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
